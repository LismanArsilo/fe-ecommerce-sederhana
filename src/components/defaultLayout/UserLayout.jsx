import React, { useState } from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import {
  DesktopOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiFacebookLogoBold } from "react-icons/pi";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../storeReduxToolkit/thunksRedux/authThunk";
import { showFailAlert, showSuccessAlert } from "../../utils/notificationUtils";

const items = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Product", "/product", <AppstoreOutlined />),
  getItem("About", "/about", <DesktopOutlined />),
];

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const selectedKey = items.find((item) => item.key === location.pathname)?.key;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    const response = await dispatch(authLogout());
    if (response.payload?.status !== 500) {
      showSuccessAlert(response.payload.message);
    } else {
      showFailAlert(response.payload.data.message);
    }
  };
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          selectedKeys={selectedKey ? [selectedKey] : selectedKeys}
          onClick={(info) => {
            return navigate(info.key);
          }}
        />
        <div>
          {authToken ? (
            <Button
              className="text-white border py-1 text-center px-5 rounded-xl"
              onClick={handleLogout}
            >
              Keluar
            </Button>
          ) : (
            <NavLink
              to="/login"
              className="text-white border py-1 text-center px-5 rounded-xl"
            >
              Masuk / Daftar
            </NavLink>
          )}
        </div>
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer className="p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="-mb-1"
        >
          <path
            fill="#2563Eb"
            fillOpacity="1"
            d="M0,128L26.7,149.3C53.3,171,107,213,160,213.3C213.3,213,267,171,320,154.7C373.3,139,427,149,480,170.7C533.3,192,587,224,640,229.3C693.3,235,747,213,800,218.7C853.3,224,907,256,960,234.7C1013.3,213,1067,139,1120,144C1173.3,149,1227,235,1280,256C1333.3,277,1387,235,1413,213.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
        <div className="grid grid-cols-1 gap-3 bg-blue-600 py-4 md:px-20 md:grid-cols-2 lg:grid-cols-4 lg:pb-10">
          <div className="flex flex-col justify-center items-center gap-1 lg:justify-start">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt=""
                className="w-10 bg-white p-2 rounded-3xl"
              />
              <span className="font-bold text-2xl">Isyam Store</span>
            </div>
            <div className="flex gap-2">
              <FaInstagram className="text-3xl" />
              <PiFacebookLogoBold className="text-3xl" />
              <FaWhatsapp className="text-3xl" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 lg:justify-start">
            <h2 className="font-bold text-lg">Informasi</h2>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Home
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Produk
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Tentang Kami
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Kontak
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 lg:justify-start">
            <h2 className="font-bold text-lg">Pusat Bantuan</h2>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Syarat & Ketentuan
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              Kebijakan & Privasi
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 lg:justify-start">
            <h2 className="font-bold text-lg">Kontak Kami</h2>
            <span className="font-semibold text-sm hover:cursor-pointer">
              www.isyam.com
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              isyam@gmail.com
            </span>
            <span className="font-semibold text-sm hover:cursor-pointer">
              +62 8521 235 7622
            </span>
          </div>
          <span className="mt-5 w-full text-center md:text-left ">
            Ant Design ©{new Date().getFullYear()} Created by Lisman Arsilo
          </span>
        </div>
      </Footer>
    </Layout>
  );
};

export default UserLayout;
