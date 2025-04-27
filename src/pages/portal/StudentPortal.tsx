import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, GraduationCap, Calendar, CreditCard, BookOpen, Database } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const StudentPortal: React.FC = () => {
  const portalFeatures = [
    {
      title: 'Apply for Admission',
      description: 'Start your academic journey by submitting your application.',
      icon: FileText,
      link: '/portal/apply',
      color: 'bg-blue-500',
    },
    {
      title: 'Course Registration',
      description: 'Register for courses and manage your academic schedule.',
      icon: GraduationCap,
      link: '/portal/courses',
      color: 'bg-green-500',
    },
    {
      title: 'View Submissions',
      description: 'View your submitted applications and course registrations.',
      icon: Database,
      link: '/portal/submissions',
      color: 'bg-indigo-500',
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and academic events.',
      icon: Calendar,
      link: '/portal/calendar',
      color: 'bg-purple-500',
    },
    {
      title: 'Fee Payment',
      description: 'Make payments and view your financial records.',
      icon: CreditCard,
      link: '/portal/payments',
      color: 'bg-red-500',
    },
    {
      title: 'Course Materials',
      description: 'Access your course materials and resources.',
      icon: BookOpen,
      link: '/portal/materials',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Student Portal"
        subtitle="Access all your academic resources and services in one place"
        backgroundImage="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#0A2463] mb-6">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              Student Handbook
            </a>
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              Library Resources
            </a>
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              IT Support
            </a>
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              Campus Map
            </a>
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              Student Organizations
            </a>
            <a href="#" className="text-[#8B0000] hover:text-[#700000] font-medium">
              Career Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;