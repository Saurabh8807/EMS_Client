import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Spin } from 'antd';
import axios from '../../../../axios.js';

const { confirm } = Modal;

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false); // To differentiate between add and edit mode
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/role');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesByRole = async (roleId, roleName) => {
    setLoadingEmployees(true);
    try {
      const response = await axios.get(`/user/role/${roleId}`);
      setEmployees(response.data.data);
      setRoleName(roleName); // Set role name for modal title
      setIsEmployeeModalVisible(true);
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error('Failed to fetch employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const showEditModal = (role) => {
    setSelectedRole(role);
    setIsAddMode(false);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
    });
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setSelectedRole(null);
    setIsAddMode(true);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this role?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/role/${id}`);
          fetchRoles();
          message.success('Role deleted successfully');
        } catch (error) {
          console.error('Error deleting role:', error);
          message.error('Failed to delete Role');
        }
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isAddMode) {
        await axios.post('/role', values);
        message.success('Role added successfully');
      } else {
        await axios.put(`/role/${selectedRole._id}`, values);
        message.success('Role updated successfully');
      }
      fetchRoles();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to save Role', error);
      message.error('Failed to save Role');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Employee Count',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex flex-col space-y-2">
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteConfirm(record._id)}>
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => fetchEmployeesByRole(record._id, record.name)}
          >
            View Employees
          </Button>
        </div>
      ),
    },
  ];

  const employeeColumns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      width: 120,
      render: (avatarUrl) => <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => role?.name || 'N/A', // Adjust based on your role data structure
    },
    {
      title: 'Team Lead',
      dataIndex: 'teamLead',
      key: 'teamLead',
      render: (teamLead) => teamLead?.name || 'N/A', // Adjust based on your team lead data structure
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (isActive ? 'Active' : 'Inactive'),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center">Roles</h2>
        <Button type="primary" onClick={showAddModal}>
          Add Role
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          scroll={{ x: '100%' }}
          columns={columns}
          dataSource={roles}
          loading={loading}
          rowKey="_id"
        />
      </div>
      {/* Modal for Add & Edit */}
      <Modal
        title={isAddMode ? 'Add Role' : 'Edit Role'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter Name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter Description' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Viewing Employees by Role */}
      <Modal
        title={`Employees under ${roleName} Role`}
        visible={isEmployeeModalVisible}
        onCancel={() => setIsEmployeeModalVisible(false)}
        footer={null}
      >
        {loadingEmployees ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              scroll={{ x: 'max-content' }}
              columns={employeeColumns}
              dataSource={employees}
              rowKey="_id"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RolesTable;
