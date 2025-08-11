import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LOGIN_ERROR_MSG, LOGIN_SUCCESS_MSG } from "../constants";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = ({ username, password }) => {
    if (username && password) {
      login(username, password);
      message.success(LOGIN_SUCCESS_MSG);
      navigate("/my-journal");
    } else {
      message.error(LOGIN_ERROR_MSG);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" autoComplete="username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
