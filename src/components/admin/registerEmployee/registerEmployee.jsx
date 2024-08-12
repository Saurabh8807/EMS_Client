import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, Checkbox } from 'antd';
import axios from '../../../axios.js';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function RegisterEmployee() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await axios.post('/user/register', values);
      console.log('Employee created successfully:', response.data);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="Employee ID"
          name="employeeId"
          rules={[{ required: true, message: 'Please input the employee ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Marital Status"
          name="marital_status"
          rules={[{ required: true, message: 'Please select marital status!' }]}
        >
          <Radio.Group>
            <Radio value="single">Single</Radio>
            <Radio value="married">Married</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: 'Please select the designation!' }]}
        >
          <Select>
            <Option value="hr">HR</Option>
            <Option value="javascript-backend">JavaScript Backend</Option>
            <Option value="javascript-frontend">JavaScript Frontend</Option>
            <Option value="php">PHP</Option>
            <Option value="dotnet">.NET</Option>
            <Option value="ios">iOS</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Is Team Lead"
          name="isTeamLead"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        {/* <Form.Item
          label="Team Lead"
          name="teamLead"
          rules={[
            {
              required: false,
              message: 'Please select a team lead!',
            },
          ]}
        >
          <Select>
          <Option value="66b35c3b9b47e4f8aa27f3bb">TL1</Option>
          <Option value="66b35c3b9b47e4f8aa27f3bb">TL2</Option>          
          </Select>
        </Form.Item> */}

        <Form.Item
          label="Joining Date"
          name="joining_date"
          rules={[
            { required: true, message: 'Please select the joining date!' },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          rules={[
            { required: true, message: 'Please select the date of birth!' },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterEmployee;
