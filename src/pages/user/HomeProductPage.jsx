import React, { useEffect, useState } from "react";
import UserLayout from "../../components/defaultLayout/UserLayout";
import LogoIsyamFull from "../../assets/logoIsyamFull.png";

import {
  Input,
  Drawer,
  Skeleton,
  Empty,
  Pagination,
  message,
  Badge,
  Avatar,
} from "antd";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductUser } from "../../storeReduxToolkit/thunksRedux/userProductThunk";
import CardProduct from "../../components/feature/CardProduct";
import { NavLink } from "react-router-dom";
import {
  getAllCartItems,
  getOneCart,
} from "../../storeReduxToolkit/thunksRedux/cartThunk";
import UserCart from "../../components/feature/UserCart";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";
import CardCategory from "../../components/feature/CardCategory";

const HomeProductPage = () => {
  const [showCard, setShowCard] = useState(false);
  const [search, setSearch] = useState("");

  const [parmLimit, setParmLimit] = useState(10);
  const [parmPage, setParmPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const dispatch = useDispatch();
  // ANTD
  const [messageApi, contextHolder] = message.useMessage();
  const [parmCategory, setParmCategory] = useState("");

  const { userProducts, isLoadingProduct } = useSelector(
    (state) => state.userProduct
  );
  const { carts, cart, total } = useSelector((state) => state.cart);
  const { user, authToken } = useSelector((state) => state.auth);

  const handlePageLimit = (page, size) => {
    setParmPage(page);
    setParmLimit(size);
  };

  const handleParamCategory = (params) => {
    setParmCategory(params);
  };

  const handleShowCart = async () => {
    if (!authToken) {
      messageApi.open({
        type: "error",
        content: "Silahkan Login",
      });
    } else {
      const response = await dispatch(getOneCart(user.id));
      if (response.payload.status == true) {
        await dispatch(getAllCartItems(response.payload.data.id));
        setShowCard(!showCard);
      }
    }
  };

  const handleCountItem = async (userId) => {
    try {
      const response = await axiosAuth.get(
        config.apiUserUrl + "/cart/items/count/" + userId
      );
      if (response.status) {
        return setCountItems(response.data.data);
      }
    } catch (error) {
      return setCountItems(0);
    }
  };

  useEffect(() => {
    let useParams = {
      keyword: search,
      page: parmPage,
      category: parmCategory,
      length: parmLimit,
    };
    dispatch(getAllProductUser(useParams));
  }, [search, parmCategory, parmLimit, parmPage]);

  useEffect(() => {
    handleCountItem(user?.id);
  }, [carts]);
  return (
    <UserLayout>
      {contextHolder}
      <div className="max-w-[90%] mx-auto lg:max-w-[80%]">
        <header className="pt-7 flex items-center gap-3 mb-5">
          <NavLink to="/">
            <img
              src={LogoIsyamFull}
              alt="Logo Isyam Full"
              className="w-36 lg:w-40"
            />
          </NavLink>
          <div className="w-full">
            <Input
              placeholder="Pencarian Produk . . . "
              className="w-full"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </div>
          <div
            className="border border-gray-400 p-2 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white"
            onClick={() => handleShowCart()}
          >
            <Badge size="small" count={countItems} showZero={true}>
              <TiShoppingCart className="text-lg" />
            </Badge>
          </div>
        </header>
        <section className="grid gap-2 grid-cols-1 sm:grid-cols-4 ">
          {/* Left */}
          <CardCategory
            parmCategory={parmCategory}
            handleParamCategory={handleParamCategory}
          />
          {/* Right */}
          <div className="sm:col-span-3 min-h-screen">
            {userProducts.data && userProducts.data.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {userProducts.data.map((product, index) => (
                    <div
                      className="border border-gray-400 rounded-lg flex flex-col justify-between"
                      key={product.id}
                    >
                      <CardProduct
                        product={product}
                        isLoading={isLoadingProduct}
                        userId={user?.id}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-5 mb-10">
                  <Pagination
                    className="text-xs md:text-md lg:text-lg flex justify-around gap-1"
                    defaultCurrent={userProducts.current_page}
                    total={userProducts.total}
                    pageSize={parmLimit}
                    responsive={true}
                    current={parmPage}
                    onChange={(page, size) => handlePageLimit(page, size)}
                  />
                </div>
              </>
            ) : (
              <Empty className="mt-24" />
            )}
          </div>
        </section>
      </div>
      <div className="">
        <Drawer
          title={`Keranjang, ${user?.name}`}
          onClose={() => setShowCard(!showCard)}
          open={showCard}
          className="mt-16"
        >
          {cart !== null ? (
            <div className="pb-10 relative">
              <div className="flex flex-col gap-5 ">
                {carts &&
                  carts.map((cartItem, index) => {
                    return (
                      <div key={index + 1}>
                        <UserCart cartItem={cartItem} />
                      </div>
                    );
                  })}
              </div>
              <div className="sticky bottom-10 bg-blue-600 p-2 mt-10 -m-6 cursor-pointer flex justify-center">
                <NavLink
                  to="/product/order"
                  className="font-bold text-white flex gap-2"
                >
                  Bayar
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(total)}
                  </span>
                </NavLink>
              </div>
            </div>
          ) : (
            <Empty
              description={
                <div className="flex flex-col">
                  <span className="font-semibold">
                    Silahkan Memilih Produk Untuk Membuat Keranjang Belanja Anda
                  </span>
                  <span className="text-lg font-bold">Happy Shopping</span>
                </div>
              }
            />
          )}
        </Drawer>
      </div>
    </UserLayout>
  );
};

export default HomeProductPage;
