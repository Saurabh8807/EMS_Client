import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DefaultSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Manage Users', path: '/manage-users' },
    { name: 'Register Employee', path: '/admin-dashboard/register-employee' },
    { name: 'Settings', path: '/settings' },
  ];

  const hrLinks = [
    { name: 'Dashboard', path: '/hr-dashboard' },
    { name: 'Manage Employees', path: '/manage-employees' },
    { name: 'Reports', path: '/reports' },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/employee-dashboard' },
    { name: 'My Tasks', path: '/my-tasks' },
    { name: 'Profile', path: '/profile' },
  ];

  const links = user?.role === 'admin' ? adminLinks 
              : user?.role === 'hr' ? hrLinks 
              : employeeLinks;

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Panel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="block py-2.5 px-4 rounded-md text-lg font-medium hover:bg-gray-700"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link to="/settings" className="block py-2.5 px-4 rounded-md text-lg font-medium hover:bg-gray-700">
          Settings
        </Link>
        <Link to="/logout" className="block py-2.5 px-4 rounded-md text-lg font-medium mt-4 bg-red-600 hover:bg-red-700">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default DefaultSidebar;
