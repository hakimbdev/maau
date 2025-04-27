import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Import our mock Firebase implementation
import { db, collection, addDoc, serverTimestamp } from '../../firebase/config';
import { CheckCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const applicationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    middleName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female', 'other']),
    nationality: z.string().min(2, 'Nationality is required'),
    stateOfOrigin: z.string().min(2, 'State of origin is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
  }),
  guardianInfo: z.object({
    fullName: z.string().min(2, 'Guardian name is required'),
    relationship: z.string().min(2, 'Relationship is required'),
    phone: z.string().min(10, 'Phone number is required'),
    email: z.string().email('Invalid email address').optional(),
    address: z.string().min(5, 'Address is required'),
  }),
  academicInfo: z.object({
    program: z.string().min(1, 'Program selection is required'),
    faculty: z.string().min(1, 'Faculty selection is required'),
    entryLevel: z.string().min(1, 'Entry level is required'),
    previousSchool: z.string().min(2, 'Previous school is required'),
    graduationYear: z.string().min(4, 'Graduation year is required'),
    qualificationType: z.string().min(1, 'Qualification type is required'),
    gpa: z.string().min(1, 'GPA/Grade is required'),
  }),
  documents: z.object({
    transcript: z.any(),
    idCard: z.any(),
    photo: z.any(),
    birthCertificate: z.any(),
    recommendationLetter: z.any().optional(),
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  });

  const nextStep = async (stepNumber: number) => {
    const fieldsToValidate = stepNumber === 1
      ? Object.keys(applicationSchema.shape.personalInfo.shape).map(key => `personalInfo.${key}`)
      : stepNumber === 2
      ? Object.keys(applicationSchema.shape.guardianInfo.shape).map(key => `guardianInfo.${key}`)
      : stepNumber === 3
      ? Object.keys(applicationSchema.shape.academicInfo.shape).map(key => `academicInfo.${key}`)
      : [];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ApplicationFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      // Generate an application ID
      const appId = 'APP' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      setApplicationId(appId);

      // Process the data to make it Firestore-friendly
      const processedData = {
        personalInfo: data.personalInfo,
        guardianInfo: data.guardianInfo,
        academicInfo: data.academicInfo,
        documents: {
          // Store only the file names for now
          transcript: data.documents.transcript?.[0]?.name || null,
          idCard: data.documents.idCard?.[0]?.name || null,
          photo: data.documents.photo?.[0]?.name || null,
          birthCertificate: data.documents.birthCertificate?.[0]?.name || null,
          recommendationLetter: data.documents.recommendationLetter?.[0]?.name || null,
        },
        applicationId: appId,
        timestamp: serverTimestamp(),
        status: 'pending'
      };

      // Add a new document to the "applicationform" collection
      await addDoc(collection(db, "applicationform"), processedData);

      console.log("Application submitted successfully");
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error submitting application: ", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Application Form"
        subtitle="Complete the form below to apply for admission"
        backgroundImage="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="container mx-auto px-4 py-12">
        {isSubmitted ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Your application has been submitted successfully. We will review your application and get back to you soon.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-center">Application Reference: <span className="font-bold">{applicationId}</span></p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/portal'}
                className="bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A2463] mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.firstName')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.lastName')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.lastName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.middleName')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('personalInfo.email')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('personalInfo.phone')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register('personalInfo.dateOfBirth')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.dateOfBirth.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    {...register('personalInfo.gender')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.personalInfo?.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.gender.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.nationality')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.nationality && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.nationality.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State of Origin
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.stateOfOrigin')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.stateOfOrigin && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.stateOfOrigin.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.address')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.address.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    {...register('personalInfo.city')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.personalInfo?.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.city.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A2463] mb-4">Guardian Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('guardianInfo.fullName')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.guardianInfo?.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.guardianInfo.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    {...register('guardianInfo.relationship')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    placeholder="Parent, Guardian, etc."
                  />
                  {errors.guardianInfo?.relationship && (
                    <p className="text-red-500 text-sm mt-1">{errors.guardianInfo.relationship.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('guardianInfo.phone')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.guardianInfo?.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.guardianInfo.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    {...register('guardianInfo.email')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.guardianInfo?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.guardianInfo.email.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('guardianInfo.address')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.guardianInfo?.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.guardianInfo.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A2463] mb-4">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program
                  </label>
                  <select
                    {...register('academicInfo.program')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  >
                    <option value="">Select a program</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business-admin">Business Administration</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                  </select>
                  {errors.academicInfo?.program && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.program.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty
                  </label>
                  <select
                    {...register('academicInfo.faculty')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  >
                    <option value="">Select Faculty</option>
                    <option value="Science">Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Arts">Arts</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Medicine">Medicine</option>
                  </select>
                  {errors.academicInfo?.faculty && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.faculty.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entry Level
                  </label>
                  <select
                    {...register('academicInfo.entryLevel')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  >
                    <option value="">Select Entry Level</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                  </select>
                  {errors.academicInfo?.entryLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.entryLevel.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School
                  </label>
                  <input
                    type="text"
                    {...register('academicInfo.previousSchool')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  />
                  {errors.academicInfo?.previousSchool && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.previousSchool.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    {...register('academicInfo.graduationYear')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    placeholder="e.g., 2022"
                  />
                  {errors.academicInfo?.graduationYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.graduationYear.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification Type
                  </label>
                  <select
                    {...register('academicInfo.qualificationType')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                  >
                    <option value="">Select Qualification</option>
                    <option value="SSCE">SSCE</option>
                    <option value="NECO">NECO</option>
                    <option value="GCE">GCE</option>
                    <option value="IGCSE">IGCSE</option>
                    <option value="OND">OND</option>
                    <option value="HND">HND</option>
                    <option value="BSc">BSc</option>
                  </select>
                  {errors.academicInfo?.qualificationType && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.qualificationType.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA/Grade
                  </label>
                  <input
                    type="text"
                    {...register('academicInfo.gpa')}
                    className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    placeholder="e.g., 3.5 or B2"
                  />
                  {errors.academicInfo?.gpa && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicInfo.gpa.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Upload */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A2463] mb-4">Required Documents</h2>
              <div className="bg-yellow-50 p-4 rounded-md mb-6 flex items-start">
                <AlertCircle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm text-yellow-700">
                  Note: Document upload functionality is currently in test mode. Please upload your actual documents during the in-person verification process.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Transcript
                  </label>
                  <input
                    type="file"
                    {...register('documents.transcript')}
                    className="w-full block text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0A2463] file:text-white
                    hover:file:bg-[#051845]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Card/Passport
                  </label>
                  <input
                    type="file"
                    {...register('documents.idCard')}
                    className="w-full block text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0A2463] file:text-white
                    hover:file:bg-[#051845]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passport Photo
                  </label>
                  <input
                    type="file"
                    {...register('documents.photo')}
                    className="w-full block text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0A2463] file:text-white
                    hover:file:bg-[#051845]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Birth Certificate
                  </label>
                  <input
                    type="file"
                    {...register('documents.birthCertificate')}
                    className="w-full block text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0A2463] file:text-white
                    hover:file:bg-[#051845]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommendation Letter (Optional)
                  </label>
                  <input
                    type="file"
                    {...register('documents.recommendationLetter')}
                    className="w-full block text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0A2463] file:text-white
                    hover:file:bg-[#051845]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className={`${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B0000] hover:bg-[#700000]'} text-white px-6 py-3 rounded-md font-medium transition-colors`}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;