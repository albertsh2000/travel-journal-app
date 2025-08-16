import React from "react";
import { Layout } from "antd";
import NavigationMenu from "./NavigationMenu";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => (
  <Layout>
    <Header>
      <NavigationMenu />
    </Header>
    <Content style={{ padding: "24px" }}>{children}</Content>
  </Layout>
);

export default MainLayout;
