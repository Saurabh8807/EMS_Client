import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form,Spin, Input, message } from 'antd';
import axios from '../../../../axios.js';

const { confirm } = Modal;

const DesignationsTable = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false); // To differentiate between add and edit mode
  const [form] = Form.useForm(); // Initialize the form instance
  const [employees, setEmployees] = useState([]);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [designationName, setDesignationName] = useState('');

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/designation');
      setDesignations(response.data.data);
    } catch (error) {
      console.error('Error fetching designations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesByDesignation = async (designationId,designationName) => {
    setLoadingEmployees(true);
    try {
      const response = await axios.get(`/user/designation/${designationId}`);
      setEmployees(response.data.data);
      setDesignationName(designationName); // Set designation name for modal title
      setIsEmployeeModalVisible(true);
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error('Failed to fetch employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const showEditModal = (designation) => {
    setSelectedDesignation(designation);
    setIsAddMode(false);
    form.setFieldsValue({
      name: designation.name,
      description: designation.description,
    }); // Prefill form fields with selected designation
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setSelectedDesignation(null);
    setIsAddMode(true);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate the form fields
      if (isAddMode) {
        await axios.post('/designation', values);
        message.success('Designation added successfully');
      } else {
        await axios.put(`/designation/${selectedDesignation._id}`, values);
        message.success('Designation updated successfully');
      }      
      fetchDesignations(); // Refresh the table data
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Failed to update Designation', error);
      message.error('Failed to update Designation');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields when the modal is closed
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this designation?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/designation/${id}`);
          fetchDesignations();
          message.success('Designation deleted successfully');
        } catch (error) {
          console.error('Error deleting designation:', error);
          message.error('Failed to delete Designation');
        }
      },
    });
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
            onClick={() => fetchEmployeesByDesignation(record._id, record.name)}
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
        <h2 className="text-2xl text-center font-semibold mb-4">Designations</h2>
        <Button type="primary" onClick={showAddModal}>
          Add Designation
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          scroll={{ x: '100%' }}
          columns={columns}
          dataSource={designations}
          loading={loading}
          rowKey="_id"
        />
      </div>
      {/* Modal for add & Edit */}
      <Modal
        title={isAddMode ? 'Add Designation' : 'Edit Designation'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the Name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the Description' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

        {/* Modal for Viewing Employees by Designation */}
        <Modal
        title={`Employees under ${designationName} Designation`}
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

export default DesignationsTable;
