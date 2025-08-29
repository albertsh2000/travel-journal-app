import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

const { Header, Content } = Layout;

const MainLayout = () => (
  <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
    <Header>
      <NavigationMenu />
    </Header>
    <Content style={{ padding: "24px", background: "#abb6bc" }}>
      <Outlet />
    </Content>
  </Layout>
);

export default MainLayout;
