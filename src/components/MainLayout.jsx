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
import HeroBanner from "./HeroBanner";

const { Paragraph, Link } = Typography;

const { Header, Content, Footer } = Layout;

const MainLayout = () => (
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
        style={{ maxWidth: 800, margin: "0 auto", color: "#fff", opacity: 0.7 }}
      >
        <Paragraph style={{ color: "#fff" }}>
          <strong>About Travel Journal:</strong> Your go-to platform for sharing
          and discovering travel stories, tips, and guides from around the
          world.
        </Paragraph>

        <Space size="large" style={{ marginBottom: 16 }}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", opacity: 0.7 }}
          >
            <FacebookOutlined
              style={{ fontSize: 24, color: "#fff", opacity: 0.7 }}
            />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <TwitterOutlined
              style={{ fontSize: 24, color: "#fff", opacity: 0.7 }}
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", opacity: 0.7 }}
          >
            <InstagramOutlined
              style={{ fontSize: 24, color: "#fff", opacity: 0.7 }}
            />
          </Link>
          <Link
            href="mailto:support@traveljournal.com"
            style={{ color: "#fff", opacity: 0.7 }}
          >
            <MailOutlined style={{ fontSize: 24 }} />
          </Link>
        </Space>

        <Paragraph>
          <span style={{ color: "#fff", opacity: 0.7, paddingRight: "5px" }}>
            Contact us:
          </span>
          <a href="mailto:support@traveljournal.com">
            support@traveljournal.com
          </a>
        </Paragraph>

        <Paragraph
          type="secondary"
          style={{ marginTop: 20, color: "#fff", opacity: 0.7 }}
        >
          © 2025 Travel Journal. All rights reserved.
        </Paragraph>
      </div>
    </Footer>
  </Layout>
);

export default MainLayout;
