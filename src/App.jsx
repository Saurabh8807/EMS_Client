import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login.jsx';

// admin-imports
import AdminDashboard from './components/admin/adminDashboard.jsx';
import RegisterEmployee from './components/admin/registerEmployee/registerEmployee.jsx';

// hr-imports
import HRDashboard from './components/hr/hrDashboard.jsx';

// employee-imports
import EmployeeDashboard from './components/employee/employeeDashboard.jsx';


import ProtectedRoute from './components/protectedroutes.jsx';
import DefaultSidebar from './components/sidebar.jsx';

// import Unauthorized from './components/unauthorized.jsx';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex">
    {user && <DefaultSidebar />}
    <div className="flex-1">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* admin-routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
        <Route path="/admin-dashboard/register-employee" element={<ProtectedRoute element={<RegisterEmployee />} roles={['admin']} />} />
        
        {/* hr-routes */}
        <Route path="/hr-dashboard" element={<ProtectedRoute element={<HRDashboard />} roles={['hr']} />} />
        
        {/* employee-routes */}
        <Route path="/employee-dashboard" element={<ProtectedRoute element={<EmployeeDashboard />} roles={['employee']} />} />
      </Routes>
    </div>
  </div>
  );
};

export default App;
