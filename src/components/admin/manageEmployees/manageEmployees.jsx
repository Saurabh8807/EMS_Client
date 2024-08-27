import React from 'react';
import EmployeeTable from './employeesTable/employeesTable.jsx';
import DesignationsTable from './designationTable/designationTable.jsx';
import RolesTable from './roleTable/roleTable.jsx';

const ManageEmployees = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
          <EmployeeTable />
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="col-span-1">
          <DesignationsTable />
        </div>
        <div className="col-span-1">
          <RolesTable />
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
