import React, { useEffect, useState } from "react";
import UserLayout from "../../components/defaultLayout/UserLayout";
import HeaderImg from "../../assets/header.jpg";
import Discount from "../../assets/discount.png";
import { NavLink } from "react-router-dom";
import { TiWorld } from "react-icons/ti";
import {
  MdManageSearch,
  MdOutlineHighQuality,
  MdPayment,
} from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryUser } from "../../storeReduxToolkit/thunksRedux/userCategoryThunk";
import { Empty, Skeleton } from "antd";

const HomePage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { user, authToken } = useSelector((state) => state.auth);
  const { userCategories, isLoading } = useSelector(
    (state) => state.userCategory
  );

  useEffect(() => {
    let useParams = {
      keyword: search,
    };
    dispatch(getAllCategoryUser(useParams));
  }, [search]);
  return (
    <UserLayout>
      <div>
        <header className="relative">
          <img src={HeaderImg} className="min-w-[100%] object-cover" alt="" />
          <div className="absolute top-32 sm:top-28 lg:top-44 w-full sm:w-[50%] flex flex-col gap-10">
            <div className="hidden sm:flex flex-col gap-7 px-4">
              <h1 className="text-3xl lg:text-5xl font-bold">Welcome</h1>
              <p className="font-bold lg:text-lg">
                Welcome to our e-commerce! We are ready to help you Find quality
                products at the best prices. Search our extensive catalog and
                find your needs today.
              </p>
            </div>
            <div className="flex gap-2 w-full px-5">
              <NavLink
                to="/product"
                className="text-center border border-black px-4 py-1 lg:py-2 rounded bg-blue-700 text-white font-bold flex-1"
              >
                Order Now
              </NavLink>
              {authToken ? (
                <NavLink
                  to="/product"
                  className="text-center font-bold border border-black bg-white px-4 py-1 lg:py-2 rounded  flex-1 hover:text-black"
                >
                  Belanja
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="text-center font-bold border border-black bg-white px-4 py-1 lg:py-2 rounded  flex-1 hover:text-black"
                >
                  Masuk / Daftar
                </NavLink>
              )}
            </div>
          </div>
        </header>
        {/* Category */}
        <section className="border border-gray-500 rounded-xl mt-5 mx-3 md:max-w-[80%] md:mx-auto">
          <div className="p-4 flex flex-col gap-4 ">
            <div className="flex  relative gap-5 items-center">
              <h1 className="font-bold text-sm sm:text-base md:text-lg">
                Kategori Pilihan
                <span className="absolute -bottom-1 left-0 w-full h-px bg-blue-900"></span>
              </h1>
              <div className="w-[85%] relative">
                <input
                  type="text"
                  className="border border-black w-full h-8 rounded-md px-4 pr-8"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <MdManageSearch className="absolute right-3 bottom-2 text-xl cursor-pointer" />
              </div>
            </div>
            <div className="flex  items-center gap-2 overflow-auto scroll-smooth text-center pb-2">
              <Skeleton
                loading={isLoading}
                paragraph={{
                  rows: 1,
                }}
                block
                active
              >
                {userCategories && userCategories.length > 0 ? (
                  userCategories.map((category, index) => (
                    <div
                      key={category.id}
                      className="w-full bg-blue-500 p-3 rounded-lg"
                    >
                      <NavLink
                        to={`/product`}
                        className="font-semibold whitespace-nowrap text-white"
                      >
                        {category.name}
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <Empty className="" description="Kategori Tidak Ada" />
                  </div>
                )}
              </Skeleton>
            </div>
          </div>
        </section>
        {/* Promo */}
        <section className="text-white border-none">
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
          <div className=" bg-blue-600 p-5 md:p-7 xl:p-10 ">
            <h1 className="text-center text-2xl sm:text-3xl sm:mb-5 xl:text-4xl xl:mb-7 mb-4">
              Kenapa Belanja Di Kami ?
            </h1>
            <div className="px-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <div className="text-center flex flex-col justify-center items-center">
                <TiWorld className="text-7xl text-black" />
                <div>
                  <h2 className="text-xl font-bold">
                    Pengiriman Seluruh Indonesia
                  </h2>
                  <span className="text-md">
                    Jelajahi beragam pilihan produk kami dengan kemudahan
                    pengiriman ke seluruh Indonesia, bawa barang favorit Anda
                    langsung ke depan pintu Anda, di mana pun Anda berada.
                  </span>
                </div>
              </div>
              <div className="text-center flex flex-col justify-center items-center">
                <MdOutlineHighQuality className="text-7xl text-black" />
                <div>
                  <h2 className="text-xl font-bold">Kualitas Terbaik</h2>
                  <span className="text-md">
                    Produk kami identik dengan menetapkan dan melampaui standar
                    industri, memberikan produk yang mewujudkan esensi kualitas
                    terbaik.
                  </span>
                </div>
              </div>
              <div className="text-center flex flex-col justify-center items-center">
                <BiSolidOffer className="text-7xl text-black" />
                <div>
                  <h2 className="text-xl font-bold">Penawaran Terbaik</h2>
                  <span className="text-md">
                    Kepuasan Anda adalah prioritas kami, temukan penawaran yang
                    dipersonalisasi dan penawaran terbaik yang dirancang khusus
                    untuk Anda.
                  </span>
                </div>
              </div>
              <div className="text-center flex flex-col justify-center items-center">
                <MdPayment className="text-7xl text-black" />
                <div>
                  <h2 className="text-xl font-bold">Pembayaran Aman</h2>
                  <span className="text-md">
                    Rasakan pengalaman berbelanja tanpa rasa khawatir dengan
                    komitmen kami untuk menyediakan pembayaran yang aman untuk
                    setiap pembelian.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="-mt-1"
          >
            <path
              fill="#2563Eb"
              fillOpacity="1"
              d="M0,128L26.7,149.3C53.3,171,107,213,160,213.3C213.3,213,267,171,320,154.7C373.3,139,427,149,480,170.7C533.3,192,587,224,640,229.3C693.3,235,747,213,800,218.7C853.3,224,907,256,960,234.7C1013.3,213,1067,139,1120,144C1173.3,149,1227,235,1280,256C1333.3,277,1387,235,1413,213.3L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
            ></path>
          </svg>
        </section>
        {/* Description */}
        <section className="md:max-w-[80%] md:mx-auto ">
          <div className="flex flex-col px-5  items-center justify-center  md:flex-row">
            <img src={Discount} alt="" className="md:max-w-[50%]" />
            <div className="flex flex-col gap-2 text-center md:flex-1 lg:text-left lg:gap-5">
              <h2 className="font-bold text-2xl lg:text-3xl">
                Penawaran Terbaik
              </h2>
              <span className="font-semibold lg:text-lg">
                Kepuasan Anda adalah prioritas kami, temukan penawaran yang
                dipersonalisasi dan penawaran terbaik yang dirancang khusus
                untuk Anda.
              </span>
              <span className="font-semibold lg:text-lg">
                Belanja di toko kami menggunakan kupon dengan code
                <span className="mx-2 font-bold italic">IsyamStore</span> untuk
                mendapatkan potongan menarik
              </span>
              <NavLink
                to="#"
                className="px-6 py-1 rounded-md bg-blue-600 text-white font-bold mx-auto w-full lg:w-min lg:mx-0 lg:px-10"
              >
                Produk
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </UserLayout>
    // Untuk card menggunakan drawer antd
  );
};

export default HomePage;
