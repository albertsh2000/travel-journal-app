import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

const { Header, Content } = Layout;

const MainLayout = () => (
  <Layout>
    <Header>
      <NavigationMenu />
    </Header>
    <Content style={{ padding: "24px" }}>
      <Outlet />
    </Content>
  </Layout>
);

export default MainLayout;
