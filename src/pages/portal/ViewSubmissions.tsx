import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';

interface Submission {
  id: string;
  timestamp: string;
  [key: string]: any;
}

const ViewSubmissions = () => {
  const [applications, setApplications] = useState<Submission[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<Submission[]>([]);
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        // Load applications
        const applicationsData = localStorage.getItem('msau_applicationform');
        if (applicationsData) {
          setApplications(JSON.parse(applicationsData));
        }

        // Load course registrations
        const courseRegistrationsData = localStorage.getItem('msau_courseform');
        if (courseRegistrationsData) {
          setCourseRegistrations(JSON.parse(courseRegistrationsData));
        }

        // Load contacts
        const contactsData = localStorage.getItem('msau_contactform');
        if (contactsData) {
          setContacts(JSON.parse(contactsData));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div>
      <PageHeader
        title="View Submissions"
        subtitle="View your submitted applications and course registrations"
        backgroundImage="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="container mx-auto px-4 py-12">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2463]"></div>
          </div>
        ) : (
          <div>
            {/* Custom Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-[#0A2463] text-white'
                      : 'text-gray-700 hover:text-[#0A2463]'
                  }`}
                  onClick={() => setActiveTab('applications')}
                >
                  Applications
                </button>
                <button
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'courses'
                      ? 'bg-[#0A2463] text-white'
                      : 'text-gray-700 hover:text-[#0A2463]'
                  }`}
                  onClick={() => setActiveTab('courses')}
                >
                  Course Registrations
                </button>
                <button
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'contacts'
                      ? 'bg-[#0A2463] text-white'
                      : 'text-gray-700 hover:text-[#0A2463]'
                  }`}
                  onClick={() => setActiveTab('contacts')}
                >
                  Contact Messages
                </button>
              </div>
            </div>

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Application Submissions</h2>
                {applications.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📄</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Applications Found</h3>
                    <p className="text-gray-500">There are no application submissions yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {applications.map((application) => (
                      <div key={application.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#0A2463] text-white p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Application #{application.applicationId}</h3>
                            <span className="px-3 py-1 bg-white text-[#0A2463] rounded-full text-sm font-medium">
                              {application.status || 'Pending'}
                            </span>
                          </div>
                          <p className="text-gray-200 text-sm">
                            Submitted: {formatDate(application.timestamp)}
                          </p>
                        </div>
                        <div className="p-6">
                          {application.personalInfo && (
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg mb-2 flex items-center">
                                Applicant Information
                              </h3>
                              <p><span className="font-medium">Name:</span> {application.personalInfo.firstName} {application.personalInfo.lastName}</p>
                              <p><span className="font-medium">Email:</span> {application.personalInfo.email}</p>
                              <p><span className="font-medium">Phone:</span> {application.personalInfo.phone}</p>
                            </div>
                          )}

                          {application.academicInfo && (
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg mb-2">Academic Information</h3>
                              <p><span className="font-medium">Program:</span> {application.academicInfo.program}</p>
                              <p><span className="font-medium">Previous School:</span> {application.academicInfo.previousSchool}</p>
                            </div>
                          )}

                          <div className="mt-4 flex justify-end">
                            <button className="bg-white border border-[#0A2463] text-[#0A2463] px-4 py-2 rounded-md font-medium mr-2">
                              View Details
                            </button>
                            <button className="bg-[#0A2463] text-white px-4 py-2 rounded-md font-medium">
                              Process Application
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Course Registrations Tab */}
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Course Registration Submissions</h2>
                {courseRegistrations.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📄</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Course Registrations Found</h3>
                    <p className="text-gray-500">There are no course registration submissions yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courseRegistrations.map((registration) => (
                      <div key={registration.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#0A2463] text-white p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Registration #{registration.registrationNumber}</h3>
                            <span className="px-3 py-1 bg-white text-[#0A2463] rounded-full text-sm font-medium">
                              {registration.status || 'Pending'}
                            </span>
                          </div>
                          <p className="text-gray-200 text-sm">
                            Submitted: {formatDate(registration.timestamp)}
                          </p>
                        </div>
                        <div className="p-6">
                          {registration.studentInfo && (
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg mb-2 flex items-center">
                                Student Information
                              </h3>
                              <p><span className="font-medium">Name:</span> {registration.studentInfo.fullName}</p>
                              <p><span className="font-medium">ID:</span> {registration.studentInfo.studentId}</p>
                              <p><span className="font-medium">Level:</span> {registration.studentInfo.level}</p>
                            </div>
                          )}

                          <div className="mb-4">
                            <h3 className="font-semibold text-lg mb-2">Course Information</h3>
                            <p><span className="font-medium">Total Courses:</span> {registration.courses?.filter((c: any) => c.selected).length || 0}</p>
                            <p><span className="font-medium">Total Credit Units:</span> {registration.totalCreditUnits || 0}</p>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button className="bg-white border border-[#0A2463] text-[#0A2463] px-4 py-2 rounded-md font-medium mr-2">
                              View Details
                            </button>
                            <button className="bg-[#0A2463] text-white px-4 py-2 rounded-md font-medium">
                              Approve Registration
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact Messages Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
                {contacts.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📄</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Contact Messages Found</h3>
                    <p className="text-gray-500">There are no contact form submissions yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{contact.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              contact.status === 'read'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {contact.status === 'read' ? 'Read' : 'Unread'}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            Submitted: {formatDate(contact.timestamp)}
                          </p>
                        </div>
                        <div className="p-6">
                          <div className="mb-4">
                            <p><span className="font-medium">Email:</span> {contact.email}</p>
                            <p><span className="font-medium">Subject:</span> {contact.subject}</p>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-semibold mb-2">Message:</h3>
                            <p className="bg-gray-50 p-3 rounded">{contact.message}</p>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="bg-white border border-[#0A2463] text-[#0A2463] px-4 py-2 rounded-md font-medium mr-2">
                              Mark as Read
                            </button>
                            <button className="bg-[#0A2463] text-white px-4 py-2 rounded-md font-medium">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSubmissions;
