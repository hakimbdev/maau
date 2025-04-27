import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserSquare2,
  Newspaper,
  Calendar,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Applications', href: '/admin/applications', icon: Users },
    { name: 'Programs', href: '/admin/programs', icon: GraduationCap },
    { name: 'Faculty', href: '/admin/faculty', icon: UserSquare2 },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'Events', href: '/admin/events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A2463] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 bg-[#051845]">
            <Link to="/admin" className="text-white font-bold text-xl flex items-center">
              <img
                src="https://res.cloudinary.com/dc5qncppu/image/upload/v1745750075/maau_f9m28q.png"
                alt="MAAU Logo"
                className="w-8 h-8 mr-2"
              />
              MAAU Admin Portal
            </Link>
            <button
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                    isActive
                      ? 'bg-[#051845] text-white'
                      : 'text-gray-300 hover:bg-[#051845] hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#051845]">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#051845] hover:text-white rounded-lg"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.name || 'Admin User'} | {user?.email || 'admin@maau.edu.ng'}
              </span>
            </div>
          </div>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;