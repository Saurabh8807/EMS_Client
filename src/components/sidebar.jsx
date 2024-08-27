import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserPlus, FaCog, FaTasks, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const DefaultSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> },
    { name: 'Manage Users', path: '/admin-dashboard/manage-employees', icon: <FaUsers /> },
    { name: 'Register Employee', path: '/admin-dashboard/register-employee', icon: <FaUserPlus /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  const hrLinks = [
    { name: 'Dashboard', path: '/hr-dashboard', icon: <FaTachometerAlt /> },
    { name: 'Manage Employees', path: '/manage-employees', icon: <FaUsers /> },
    { name: 'Reports', path: '/reports', icon: <FaFileAlt /> },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/employee-dashboard', icon: <FaTachometerAlt /> },
    { name: 'My Tasks', path: '/my-tasks', icon: <FaTasks /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  const links = user?.role.name === 'admin' ? adminLinks 
              : user?.role.name === 'hr' ? hrLinks 
              : employeeLinks;

  return (
    <div className="h-full fixed inset-0 w-20 lg:w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl lg:text-2xl font-bold border-b border-gray-700">
        {user?.role.name.charAt(0).toUpperCase() + user?.role.name.slice(1)} Panel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4 overflow-auto">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="flex items-center py-2.5 px-4 rounded-md text-lg font-medium hover:bg-gray-700"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="ml-4 hidden lg:inline">{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link to="/settings" className="flex items-center py-2.5 px-4 rounded-md text-lg font-medium hover:bg-gray-700">
          <FaCog className="text-2xl" />
          <span className="ml-4 hidden lg:inline">Settings</span>
        </Link>
        <Link to="/logout" className="flex items-center py-2.5 px-4 rounded-md text-lg font-medium mt-4 bg-red-600 hover:bg-red-700">
          <FaSignOutAlt className="text-2xl" />
          <span className="ml-4 hidden lg:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default DefaultSidebar;
