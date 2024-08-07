import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login.jsx';
import AdminDashboard from './components/adminDashboard.jsx';
import HRDashboard from './components/hrDashboard.jsx';
import EmployeeDashboard from './components/employeeDashboard.jsx';
import ProtectedRoute from './components/protectedroutes.jsx';
// import Unauthorized from './components/unauthorized.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
      <Route path="/hr-dashboard" element={<ProtectedRoute element={<HRDashboard />} roles={['hr']} />} />
      <Route path="/employee-dashboard" element={<ProtectedRoute element={<EmployeeDashboard />} roles={['employee']} />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
