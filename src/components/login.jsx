import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Alert } from 'antd';
import loginImg from '../assets/login.jpg';
import ThingImg from '../assets/1-ThingLogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'employee') {
        navigate('/employee-dashboard');
      } else if (user.role === 'hr') {
        navigate('/hr-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row md:h-screen bg-gray-100">
      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <img
          src={loginImg}
          alt="Login"
          className="hidden md:block w-full h-full object-cover"
        />
      </div>
      
      {/* Form Section */}
      <div className="md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-center mb-8">
            <img src={ThingImg} alt="Logo" className="w-32 h-32 object-contain" />
          </div>
          <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">Login</h1>
          <p className="text-lg text-gray-600 mb-6 text-center">Enter your details to log in to your account</p>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                type="email"
                placeholder="Email"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type=""
                htmlType="submit"
                className="w-full bg-red-500 hover:bg-red-900 text-white font-semibold rounded-md"
                loading={loading}
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
            {error && <Alert message={error} type="error" showIcon className="rounded-md" />}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
