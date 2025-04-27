import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  Calendar,
  UserSquare2,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  Building,
  Briefcase
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Total Applications',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Students',
      value: '8,567',
      change: '+5.2%',
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      title: 'Programs',
      value: '42',
      change: '+2',
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: '₦24.5M',
      change: '+15.3%',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  const quickLinks = [
    { title: 'Academic Calendar', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { title: 'Faculty Directory', icon: UserSquare2, color: 'bg-green-100 text-green-600' },
    { title: 'Course Catalog', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { title: 'Financial Reports', icon: DollarSign, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Student Records', icon: FileText, color: 'bg-red-100 text-red-600' },
    { title: 'Campus Facilities', icon: Building, color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maryam Abacha American University Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin User | {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className={`p-3 rounded-full ${link.color} mb-2`}>
                <link.icon size={20} />
              </div>
              <span className="text-sm font-medium">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Application Statistics</h2>
            <div className="flex space-x-2">
              <button className="bg-gray-100 p-1 rounded hover:bg-gray-200 transition-colors">
                <BarChart3 size={18} />
              </button>
              <button className="bg-gray-100 p-1 rounded hover:bg-gray-200 transition-colors">
                <PieChart size={18} />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Application statistics chart would appear here</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar size={14} className="mr-1" />
                <span>May 15, 2023</span>
              </div>
              <p className="font-medium">New Student Orientation</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar size={14} className="mr-1" />
                <span>May 20, 2023</span>
              </div>
              <p className="font-medium">Faculty Meeting</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar size={14} className="mr-1" />
                <span>June 5, 2023</span>
              </div>
              <p className="font-medium">Semester Registration Deadline</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    John Doe
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Computer Science
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 10, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Jane Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Business Administration
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 8, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Approved
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Michael Johnson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Medicine
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 7, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Rejected
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a href="/admin/applications" className="text-[#0A2463] hover:underline text-sm font-medium">
              View all applications →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-[#0A2463] text-white px-4 py-3 rounded-md hover:bg-[#051845] transition-colors flex items-center justify-center">
              <Users className="mr-2" size={18} />
              Review Applications
            </button>
            <button className="w-full bg-[#0A2463] text-white px-4 py-3 rounded-md hover:bg-[#051845] transition-colors flex items-center justify-center">
              <GraduationCap className="mr-2" size={18} />
              Manage Programs
            </button>
            <button className="w-full bg-[#0A2463] text-white px-4 py-3 rounded-md hover:bg-[#051845] transition-colors flex items-center justify-center">
              <UserSquare2 className="mr-2" size={18} />
              Faculty Management
            </button>
            <button className="w-full bg-[#0A2463] text-white px-4 py-3 rounded-md hover:bg-[#051845] transition-colors flex items-center justify-center">
              <Calendar className="mr-2" size={18} />
              Schedule Events
            </button>
            <button className="w-full bg-[#0A2463] text-white px-4 py-3 rounded-md hover:bg-[#051845] transition-colors flex items-center justify-center">
              <Briefcase className="mr-2" size={18} />
              Job Postings
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-700 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-sm font-medium text-gray-600">Today, 03:45 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;