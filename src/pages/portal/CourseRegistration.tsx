import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Import our mock Firebase implementation
import { db, collection, addDoc, serverTimestamp } from '../../firebase/config';
import { CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

// Define the schema for course registration
const courseRegistrationSchema = z.object({
  studentInfo: z.object({
    studentId: z.string().min(5, 'Student ID is required'),
    level: z.string().min(1, 'Level is required'),
    semester: z.string().min(1, 'Semester is required'),
    session: z.string().min(1, 'Academic session is required'),
    department: z.string().min(1, 'Department is required'),
    faculty: z.string().min(1, 'Faculty is required'),
  }),
  courses: z.array(
    z.object({
      courseCode: z.string().min(1, 'Course code is required'),
      courseTitle: z.string().min(1, 'Course title is required'),
      creditUnits: z.string().min(1, 'Credit units are required'),
      selected: z.boolean().optional(),
    })
  ).min(1, 'At least one course must be selected'),
  declaration: z.boolean().refine(val => val === true, {
    message: 'You must agree to the declaration',
  }),
});

type CourseRegistrationData = z.infer<typeof courseRegistrationSchema>;

// Sample course data
const availableCourses = [
  { courseCode: 'CSC101', courseTitle: 'Introduction to Computer Science', creditUnits: '3', selected: false },
  { courseCode: 'CSC102', courseTitle: 'Introduction to Programming', creditUnits: '3', selected: false },
  { courseCode: 'MTH101', courseTitle: 'Elementary Mathematics I', creditUnits: '3', selected: false },
  { courseCode: 'PHY101', courseTitle: 'General Physics I', creditUnits: '3', selected: false },
  { courseCode: 'CHM101', courseTitle: 'General Chemistry I', creditUnits: '3', selected: false },
  { courseCode: 'GST101', courseTitle: 'Use of English', creditUnits: '2', selected: false },
  { courseCode: 'GST102', courseTitle: 'Nigerian Peoples and Culture', creditUnits: '2', selected: false },
  { courseCode: 'BIO101', courseTitle: 'General Biology I', creditUnits: '3', selected: false },
];

const CourseRegistration: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [totalCreditUnits, setTotalCreditUnits] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CourseRegistrationData>({
    resolver: zodResolver(courseRegistrationSchema),
    defaultValues: {
      studentInfo: {
        studentId: '',
        level: '',
        semester: '',
        session: '2023/2024',
        department: '',
        faculty: '',
      },
      courses: availableCourses,
      declaration: false,
    }
  });

  // Watch for changes in selected courses
  const watchCourses = watch('courses');

  // Update total credit units when courses change
  React.useEffect(() => {
    if (watchCourses) {
      const selected = watchCourses.filter(course => course.selected);
      setSelectedCourses(selected);

      const total = selected.reduce((sum, course) => {
        return sum + parseInt(course.creditUnits || '0');
      }, 0);

      setTotalCreditUnits(total);
    }
  }, [watchCourses]);

  const handleCourseSelection = (index: number, checked: boolean) => {
    const updatedCourses = [...watchCourses];
    updatedCourses[index].selected = checked;
    setValue('courses', updatedCourses);
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: CourseRegistrationData) => {
    setSubmitting(true);
    setError(null);

    // Validate credit units
    if (totalCreditUnits < 15) {
      setError("You must register for a minimum of 15 credit units.");
      setSubmitting(false);
      return;
    }

    if (totalCreditUnits > 24) {
      setError("You cannot register for more than 24 credit units.");
      setSubmitting(false);
      return;
    }

    try {
      // Generate a random registration number
      const regNumber = 'REG' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

      // Filter only selected courses
      const selectedCoursesData = data.courses.filter(course => course.selected);

      // Add a new document to the "courseform" collection
      await addDoc(collection(db, "courseform"), {
        studentInfo: data.studentInfo,
        courses: selectedCoursesData,
        declaration: data.declaration,
        registrationNumber: regNumber,
        totalCreditUnits: totalCreditUnits,
        timestamp: serverTimestamp(),
        status: 'registered',
        semester: data.studentInfo.semester,
        academicSession: data.studentInfo.session
      });

      console.log("Course registration submitted successfully");
      setRegistrationNumber(regNumber);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error submitting course registration: ", err);
      setError("Failed to submit course registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Course Registration"
        subtitle="Register for courses for the current semester"
        backgroundImage="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
              Course Registration Successful!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Your course registration has been submitted successfully. Please keep your registration number for reference.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-center font-bold text-lg">Registration Number: <span className="text-[#0A2463]">{registrationNumber}</span></p>
            </div>
            <div className="border rounded-md p-4 mb-6">
              <h3 className="font-bold text-lg mb-2">Registered Courses</h3>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Units</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedCourses.map((course, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{course.courseCode}</td>
                      <td className="px-4 py-2">{course.courseTitle}</td>
                      <td className="px-4 py-2">{course.creditUnits}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td className="px-4 py-2" colSpan={2}>Total Credit Units</td>
                    <td className="px-4 py-2">{totalCreditUnits}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => window.print()}
                className="bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Print Registration Slip
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Student Information */}
              <div>
                <h2 className="text-2xl font-bold text-[#0A2463] mb-4">Student Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student ID
                    </label>
                    <input
                      type="text"
                      {...register('studentInfo.studentId')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    />
                    {errors.studentInfo?.studentId && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.studentId.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      {...register('studentInfo.level')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    >
                      <option value="">Select Level</option>
                      <option value="100">100 Level</option>
                      <option value="200">200 Level</option>
                      <option value="300">300 Level</option>
                      <option value="400">400 Level</option>
                      <option value="500">500 Level</option>
                    </select>
                    {errors.studentInfo?.level && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.level.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester
                    </label>
                    <select
                      {...register('studentInfo.semester')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    >
                      <option value="">Select Semester</option>
                      <option value="First">First Semester</option>
                      <option value="Second">Second Semester</option>
                    </select>
                    {errors.studentInfo?.semester && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.semester.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Academic Session
                    </label>
                    <select
                      {...register('studentInfo.session')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    >
                      <option value="2023/2024">2023/2024</option>
                      <option value="2022/2023">2022/2023</option>
                    </select>
                    {errors.studentInfo?.session && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.session.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      {...register('studentInfo.department')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                    </select>
                    {errors.studentInfo?.department && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.department.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty
                    </label>
                    <select
                      {...register('studentInfo.faculty')}
                      className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                    >
                      <option value="">Select Faculty</option>
                      <option value="Science">Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Arts">Arts</option>
                      <option value="Social Sciences">Social Sciences</option>
                      <option value="Medicine">Medicine</option>
                    </select>
                    {errors.studentInfo?.faculty && (
                      <p className="text-red-500 text-sm mt-1">{errors.studentInfo.faculty.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#0A2463]">Course Selection</h2>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Info size={16} className="mr-1" />
                    Total Credit Units: {totalCreditUnits}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md mb-4 flex items-start">
                  <AlertCircle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm text-yellow-700">
                    You must register for a minimum of 15 credit units and a maximum of 24 credit units per semester.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Select
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Credit Units
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {watchCourses.map((course, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={course.selected}
                              onChange={(e) => handleCourseSelection(index, e.target.checked)}
                              className="h-4 w-4 text-[#0A2463] focus:ring-[#0A2463] border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="hidden"
                              {...register(`courses.${index}.courseCode`)}
                              value={course.courseCode}
                            />
                            {course.courseCode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="hidden"
                              {...register(`courses.${index}.courseTitle`)}
                              value={course.courseTitle}
                            />
                            {course.courseTitle}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="hidden"
                              {...register(`courses.${index}.creditUnits`)}
                              value={course.creditUnits}
                            />
                            {course.creditUnits}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {errors.courses && (
                  <p className="text-red-500 text-sm mt-2">{errors.courses.message}</p>
                )}
              </div>

              {/* Declaration */}
              <div className="border-t pt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="declaration"
                      type="checkbox"
                      {...register('declaration')}
                      className="h-4 w-4 text-[#0A2463] focus:ring-[#0A2463] border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="declaration" className="font-medium text-gray-700">
                      Declaration
                    </label>
                    <p className="text-gray-500">
                      I hereby declare that the information provided is true and correct. I understand that any false or misleading information may result in the cancellation of my registration.
                    </p>
                    {errors.declaration && (
                      <p className="text-red-500 text-sm mt-1">{errors.declaration.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B0000] hover:bg-[#700000]'} text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center`}
                >
                  {submitting && <Loader2 className="animate-spin mr-2" size={18} />}
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistration;
