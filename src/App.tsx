import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminApplications from './pages/admin/Applications';
import AdminPrograms from './pages/admin/Programs';
import AdminFaculty from './pages/admin/Faculty';
import AdminNews from './pages/admin/News';
import AdminEvents from './pages/admin/Events';
import AdminLogin from './pages/admin/Login';
import StudentPortal from './pages/portal/StudentPortal';
import ApplicationForm from './pages/portal/ApplicationForm';
import CourseRegistration from './pages/portal/CourseRegistration';
import ViewSubmissions from './pages/portal/ViewSubmissions';
import AdminLayout from './components/layout/AdminLayout';
import PortalLayout from './components/layout/PortalLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/staff" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="applications" element={<AdminApplications />} />
                <Route path="programs" element={<AdminPrograms />} />
                <Route path="faculty" element={<AdminFaculty />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="events" element={<AdminEvents />} />
              </Route>
            </Route>

            {/* Student Portal Routes */}
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<StudentPortal />} />
              <Route path="apply" element={<ApplicationForm />} />
              <Route path="courses" element={<CourseRegistration />} />
              <Route path="submissions" element={<ViewSubmissions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;