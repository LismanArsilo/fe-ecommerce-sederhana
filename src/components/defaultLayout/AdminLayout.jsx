import React, { useState } from "react";
import SideBarLayout from "../SideBarLayout";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import SideBarLayouts from "../SideBarLayout";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AdminLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="flex flex-row"
    >
      <SideBarLayout />
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="font-bold text-lg pl-5 pt-3 relative top-0"
        >
          E-commerce Admin
        </Header>
        <Content
          style={{
            margin: "10px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-[70vh]"
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by{" "}
          <span className="font-bold">Lisman Arsilo</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
