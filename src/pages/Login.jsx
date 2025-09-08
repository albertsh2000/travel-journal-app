import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    try {
      await login(email, password);
      message.success(SUCCESS_MESSAGES.LOGIN_SUCCESS_MSG);
      navigate("/my-journal");
    } catch (err) {
      message.error(err.message || ERROR_MESSAGES.AUTH_LOGIN_FAILED);
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <Card title={t("loginTitle")} style={{ maxWidth: 400, margin: "auto" }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("loginForm.emailRequired") },
              { type: "email", message: t("loginForm.emailInvalid") },
            ]}
          >
            <Input
              type="email"
              placeholder={t("loginForm.emailPlaceholder")}
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("loginForm.passwordRequired") },
            ]}
          >
            <Input.Password
              placeholder={t("loginForm.passwordPlaceholder")}
              autoComplete="current-password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {t("login")}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
