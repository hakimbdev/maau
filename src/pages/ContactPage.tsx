import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Import our mock Firebase implementation
import { db, collection, addDoc, serverTimestamp } from '../firebase/config';
import { CheckCircle, AlertCircle, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';

// Define the schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message is required (minimum 10 characters)'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      // Add a new document to the "contactform" collection
      await addDoc(collection(db, "contactform"), {
        ...data,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      console.log("Contact form submitted successfully");
      setIsSubmitted(true);
      reset();
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error submitting contact form: ", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries"
        backgroundImage="https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#0A2463] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#0A2463] p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600 mt-1">
                        123 University Avenue<br />
                        Main Campus<br />
                        Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#0A2463] p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600 mt-1">+234 123 456 7890</p>
                      <p className="text-gray-600">+234 987 654 3210</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#0A2463] p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600 mt-1">info@msau.edu.ng</p>
                      <p className="text-gray-600">admissions@msau.edu.ng</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Office Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#0A2463] mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-700 text-center mb-2">
                      Thank You for Contacting Us!
                    </h3>
                    <p className="text-center text-gray-600">
                      Your message has been received. We will get back to you as soon as possible.
                    </p>
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                        <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          {...register('name')}
                          className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                          placeholder="+234 123 456 7890"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          {...register('subject')}
                          className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                          placeholder="Admission Inquiry"
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className="w-full px-4 py-2 border rounded-md focus:ring-[#0A2463] focus:border-[#0A2463]"
                        placeholder="Your message here..."
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A2463] hover:bg-[#051845]'} text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center`}
                      >
                        {submitting && <Loader2 className="animate-spin mr-2" size={18} />}
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#0A2463] mb-6">Find Us</h2>
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
