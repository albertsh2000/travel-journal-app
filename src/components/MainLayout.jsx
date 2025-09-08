import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import { Typography, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Paragraph, Link } = Typography;

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const { t } = useTranslation();
  return (
    <Layout
      style={{ minHeight: "100vh", overflowX: "hidden", background: "#abb6bc" }}
    >
      <Header>
        <NavigationMenu />
      </Header>
      <Content style={{ background: "#abb6bc" }}>
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            color: "#fff",
            opacity: 0.7,
          }}
        >
          <Paragraph style={{ color: "#fff" }}>
            <strong>{t("footer.aboutTitle")}</strong> {t("footer.aboutText")}
          </Paragraph>

          <Space size="large" style={{ marginBottom: 16 }}>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", opacity: 0.7 }}
            >
              <FacebookOutlined style={{ fontSize: 24, opacity: 0.7 }} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", opacity: 0.7 }}
            >
              <TwitterOutlined style={{ fontSize: 24, opacity: 0.7 }} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", opacity: 0.7 }}
            >
              <InstagramOutlined style={{ fontSize: 24, opacity: 0.7 }} />
            </Link>
            <Link
              href={`mailto:${t("footer.email")}`}
              style={{ color: "#fff", opacity: 0.7 }}
            >
              <MailOutlined style={{ fontSize: 24 }} />
            </Link>
          </Space>

          <Paragraph>
            <span style={{ color: "#fff", opacity: 0.7, paddingRight: "5px" }}>
              {t("footer.contactUs")}
            </span>
            <a href={`mailto:${t("footer.email")}`}>{t("footer.email")}</a>
          </Paragraph>

          <Paragraph
            type="secondary"
            style={{ marginTop: 20, color: "#fff", opacity: 0.7 }}
          >
            {t("footer.copyright")}
          </Paragraph>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
