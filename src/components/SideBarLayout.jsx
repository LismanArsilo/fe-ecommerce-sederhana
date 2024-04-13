import React, { useRef } from "react";
import LogoPng from "/logo.png";
import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../storeReduxToolkit/thunksRedux/authThunk";
import { showErrorAlert, showSuccessAlert } from "../utils/notificationUtils";

const SideBarLayout = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const navigate = useNavigate();

  const handleOk = async () => {
    setConfirmLoading((confirmLoading) => !confirmLoading);
    try {
      const response = await dispatch(authLogout()).unwrap();
      showSuccessAlert(response.message);
    } catch (error) {
      showErrorAlert(error);
    }
    setConfirmLoading((confirmLoading) => !confirmLoading);
    setOpen((open) => !open);
    navigate("/login");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
  }

  const items = [
    getItem("Dashboard", "/dashboard", <PieChartOutlined />),
    getItem("Product", "product", <UserOutlined />, [
      getItem("List Product", "/dashboard/product/"),
      getItem("Create Product", "/dashboard/product/create/"),
    ]),
    getItem("Category", "category", <DesktopOutlined />, [
      getItem("List Category", "/dashboard/category/"),
      getItem("Create Category", "/dashboard/category/create/"),
    ]),
    getItem("Color", "color", <BgColorsOutlined />, [
      getItem("List Color", "/dashboard/color/"),
      getItem("Create Color", "/dashboard/color/create/"),
    ]),
    getItem("Size", "size", <FontSizeOutlined />, [
      getItem("List Size", "/dashboard/size/"),
      getItem("Create Size", "/dashboard/size/create/"),
    ]),
    getItem("Files", "9", <FileOutlined />),
    getItem("Sign Out", "/signout", <FileOutlined />),
  ];
  const selectedKey = items.find((item) => item.key === location.pathname)?.key;
  return (
    <div className="min-h-[100%] border border-black">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="min-h-[100%] "
      >
        <div className="demo-logo-vertical" />
        <Link
          className="flex justify-center items-center gap-2 py-6"
          to="/dashboard"
        >
          <img src={LogoPng} alt="Logo" className="w-10 h-10" />
          <p className="text-white text-xl hidden ">Isyam Store</p>
        </Link>
        <Menu
          theme="dark"
          selectedKeys={selectedKey ? [selectedKey] : selectedKeys}
          mode="inline"
          onClick={(item) => {
            if (item.key === "/signout") {
              setOpen((prevOpen) => !prevOpen);
            } else {
              // setSelectedKey(item.key);
              navigate(item.key);
            }
          }}
          items={items}
        />
        <Modal
          title={<div className="border-b border-b-red-400">Logout</div>}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{ className: "bg-red-500" }}
        >
          <p>Are you sure you want to logout ?</p>
        </Modal>
      </Sider>
    </div>
  );
};

export default SideBarLayout;
