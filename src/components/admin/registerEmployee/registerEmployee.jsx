import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, Checkbox, Modal } from 'antd';
import axios from '../../../axios.js';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function RegisterEmployee() {
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [designation, setDesignation] =useState([])
  const [teamLeads, setTeamLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchRoles()
    fetchDesignation()
    fetchTeamLeads()
  },[])


  const fetchTeamLeads = async()=>{
    try {
      const response = await axios('/user')
      console.log(response.data.data)
      const filteredTeamLeads = response.data.data.filter(user=>user.isTeamLead==true)
      console.log(filteredTeamLeads)
      setTeamLeads(filteredTeamLeads)
      console.log(teamLeads)
    } catch (error) {
      console.error("Error fetching TLs",error)
    }
  }
  const fetchRoles = async()=>{
    try {

      const response = await axios.get('/role')
      console.log(response.data.data)
      setRoles(response.data.data)
console.log(roles)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }


  const fetchDesignation = async()=>{
    try {

      const response = await axios.get('/designation')
      setDesignation(response.data.data)
    } catch (error) {
      console.error('Error fetching designations:', error)
    }
  }

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await axios.post('/auth/register', values);
      Modal.success({
        title: 'Employee Created',
        content: 'Employee created successfully!',
        onOk: () => {
          navigate('/admin-dashboard'); 
        },
      });     
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex mx-auto justify-end lg:justify-center ml-auto w-full bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl md:my-5 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Register New Employee</h2>
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
              {designation.map((designation)=>(
                <Option key={designation._id} value={designation._id}>
                    {designation.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select>
              {roles.map((role)=>(
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Is Team Lead"
            name="isTeamLead"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
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
              {teamLeads.map((teamLead)=>(
                <Option key={teamLead._id} value={teamLead._id}>
                  {teamLead.name}
                </Option>
              ))}          
            </Select>
          </Form.Item>

          <Form.Item
            label="Joining Date"
            name="joining_date"
            rules={[
              { required: true, message: 'Please select the joining date!' },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="date_of_birth"
            rules={[
              { required: true, message: 'Please select the date of birth!' },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading} className="lg:w-full">
              Create Employee
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterEmployee;
