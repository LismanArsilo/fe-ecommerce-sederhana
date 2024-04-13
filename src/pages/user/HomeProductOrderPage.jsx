import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../storeReduxToolkit/thunksRedux/cartThunk";
import MukenaDummy from "../../assets/mukena.jpg";
import MukenaDummy1 from "../../assets/mukena-1.jpg";
import UserLayout from "../../components/defaultLayout/UserLayout";
import { Image } from "antd";

const HomeProductOrderPage = () => {
  const [service, setService] = useState(1000);
  const dispatch = useDispatch();
  const { cartsOrder, cart, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleGetAllOrder = async () => {
    try {
      await dispatch(getAllCartItems(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllOrder();
  }, []);
  console.log(cartsOrder);
  return (
    <UserLayout>
      <div className="bg-gray-300">
        <div className="py-3 max-w-[90%] mx-auto lg:max-w-[80%] ">
          <div className="flex flex-col gap-2 relative">
            <h1 className="font-bold text-xl">Order Detail</h1>
            <div className="flex flex-col md:flex-row gap-3 ">
              {/* Left */}
              <div className="flex-1 flex-grow flex flex-col gap-3">
                {/* Address */}
                <div className="bg-white p-3 rounded-xl">
                  <h3 className="text-md md:text-lg font-semibold text-gray-900">
                    Alamat Pengiriman
                  </h3>
                  <span className="text-xs md:text-sm">
                    Jl. H. Ahmad Gg. H. Amin No. 116 RT. 003 RW. 005 Kp. Bakung
                    Kel. Cilodong Kec. Cilodong Depok 16414 (Kontrakan No. 2),
                    Cilodong, Kota Depok, Jawa Barat, 6285212357622
                  </span>
                </div>
                {/* Product */}
                <div className="flex flex-col gap-3">
                  {cartsOrder &&
                    cartsOrder.map((order) => {
                      return (
                        <div
                          key={order.id}
                          className="bg-white p-3 rounded-xl flex gap-4"
                        >
                          <div className="max-w-16">
                            <Image.PreviewGroup
                              items={[MukenaDummy, MukenaDummy1, MukenaDummy1]}
                            >
                              <Image className="w-full" src={MukenaDummy} />
                            </Image.PreviewGroup>
                          </div>
                          <div>
                            <h3 className="text-sm md:text-lg font-semibold text-black">
                              {order.products.name}
                            </h3>
                            <div className="font-bold text-black flex gap-1 text-sm md:text-lg">
                              <span>{order.qty}</span>
                              <span>x</span>
                              <span>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(order.products.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* Right */}
              <div className=" bg-white md:w-[30%] p-3 sticky bottom-0 md:top-20 max-h-64 rounded-xl border border-black">
                <h3 className="font-semibold text-base mb-4 border-b border-blue-700">
                  Ringkasan Belanja
                </h3>
                {/* Detail Order */}
                <div className="text-xs flex flex-col gap-1 border-b border-b-blue-600 pb-3">
                  <div className="flex justify-between">
                    <div>
                      <span>Total Harga </span>
                      <span>
                        (
                        {cartsOrder.reduce((acc, order) => {
                          return acc + order.qty;
                        }, 0)}
                        Barang)
                      </span>
                    </div>
                    <span className="font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Aplikasi</span>
                    {service && (
                      <span className="font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(service)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <span>Total Biaya</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(service + total)}
                  </span>
                </div>
                <div className="border bg-green-600 text-white px-1 py-1 flex justify-center font-semibold text-lg rounded-xl md:w-[90%] md:absolute md:bottom-5 mt-3 cursor-pointer hover:bg-green-700">
                  <span>Pembayaran</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomeProductOrderPage;
