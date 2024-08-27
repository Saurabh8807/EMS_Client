import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Card, Tag, Input } from 'antd';
import axios from '../../../../axios.js';

const EmployeesTable = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchItem,setSeacrhItem]=useState('')
  // useEffect(() => {
  //   fetchEmployees(searchItem);
  // }, [searchItem]);

  const fetchEmployees = async (query ='') => {
    setLoading(true);
    try {
      const response = await axios.get(`/user${query?`?search=${query}`:""}`)
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };
  const handleSearch = (e) => {
    setSeacrhItem(e.target.value)
  };

  useEffect(()=>{
    const delayDebounce = setTimeout(()=>{
      fetchEmployees(searchItem)
    },500)

    return () =>clearTimeout(delayDebounce)
  },[searchItem])
  
  const rowClassName = (record) =>
    record.isTeamLead ? 'bg-blue-200' : '';

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
      width:150,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      width: 100,
      render: (avatarUrl) => <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 150,
      render: (isActive) => (
        <Tag color={isActive ? 'darkgreen' : 'darkred'}>
          {isActive ? 'Active' : 'InActive'}
        </Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (role) => 
        
        <Tag color='Green'>
        {role?.name.charAt(0).toUpperCase() + role?.name.slice(1) || 'N/A'}
        </Tag>
        ,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: 150,
      render: (designation) =>
        <Tag color='Blue'>
{        designation?.name.charAt(0).toUpperCase() + designation?.name.slice(1) || 'N/A'
}        </Tag>
        ,
    },
    {
      title: 'Team Lead',
      dataIndex: 'isTeamLead',
      key: 'isTeamLead',
      width: 150,
      render: (isTeamLead) => (
        <Tag color={isTeamLead ? 'green' : 'red'}>
          {isTeamLead ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Team Leader',
      dataIndex: 'teamLead',
      key: 'teamLead',
      width: 150,
      render: (teamLead) => (
        <Tag color={teamLead ? 'blue' : 'gray'}>
          {teamLead?.name || 'None'}
        </Tag>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      render: (gender) => (
        <Tag color={gender === 'male' ? 'blue' : 'pink'}>
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Marital Status',
      dataIndex: 'marital_status',
      key: 'marital_status',
      width: 150,
      render: (status) => {
        let color = status === 'married' ? 'green' : status === 'single' ? 'gold' : 'gray';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Joining Date',
      dataIndex: 'joining_date',
      key: 'joining_date',
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Employee List</h2>
        <Input
          placeholder="Search employees"
          onChange={handleSearch}
          value={searchItem}
          className="w-64"
          allowClear
        />
      </div>      
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={employees}
          rowKey={(record) => record._id}
          loading={loading}
          bordered
          scroll={{ x: '100%' }}
          rowClassName={rowClassName}
        />
      </div>
      {selectedEmployee && (
        <Modal
          title={<div className="text-3xl font-bold text-center text-gray-800">Employee Details</div>}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel} className="bg-red-500 text-white rounded-md px-6 py-2">
              Close
            </Button>,
          ]}
          height={100}
          width={700}
          bodyStyle={{ padding: '10px', backgroundColor: '#f9f9f9' }}
        >
          <Card
            style={{ width: '100%', textAlign: 'center', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <div className="flex justify-center">
              <img
                alt="Avatar"
                src={selectedEmployee.avatarUrl}
                className="w-40 h-40 rounded-full border-4 border-white object-cover"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-lg text-gray-700">
                <p className="mb-3"><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
                <p className="mb-3"><strong>Name:</strong> {selectedEmployee.name}</p>
                <p className="mb-3"><strong>Email:</strong> {selectedEmployee.email}</p>
                <p className="mb-3"><strong>Phone:</strong> {selectedEmployee.phone}</p>
                <p className="mb-3"><strong>Active</strong> {selectedEmployee.isActive?"Yes":"No"}</p>
                <p className="mb-3"><strong>Role:</strong> {selectedEmployee.role?.name || 'N/A'}</p>
                <p className="mb-3"><strong>Designation:</strong> {selectedEmployee.designation?.name || 'N/A'}</p>
                <p className="mb-3"><strong>Team Lead:</strong> {selectedEmployee.teamLead?.name || 'None'}</p>
                <p className="mb-3"><strong>Gender:</strong> {selectedEmployee.gender}</p>
                <p className="mb-3"><strong>Marital Status:</strong> {selectedEmployee.marital_status}</p>
                <p className="mb-3"><strong>Joining Date:</strong> {new Date(selectedEmployee.joining_date).toLocaleDateString()}</p>
                <p className="mb-3"><strong>Date of Birth:</strong> {new Date(selectedEmployee.date_of_birth).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default EmployeesTable;
