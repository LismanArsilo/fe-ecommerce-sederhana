import React from "react";
import MukenaDummy from "../../assets/mukena.jpg";
import MukenaDummy1 from "../../assets/mukena-1.jpg";
import { Image, Skeleton } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../storeReduxToolkit/thunksRedux/cartThunk";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";

const CardProduct = ({ product, isLoading, userId }) => {
  const dispatch = useDispatch();
  const handleAddItem = async (userId, productId) => {
    const response = await dispatch(
      addItemToCart({ payload: { product_id: productId }, userId })
    );
    // Setup Handle Response for backend
    if (response.payload.status == true) {
      showSuccessAlert(response.payload.message);
    } else if (response.payload.status == 400) {
      showErrorAlert(response.payload.data.errors);
    } else {
      showFailAlert(response.payload.data.message);
    }
  };

  return (
    <Skeleton loading={isLoading} active avatar>
      <div>
        <Image.PreviewGroup items={[MukenaDummy, MukenaDummy1, MukenaDummy1]}>
          <Image className="w-full" src={MukenaDummy} />
        </Image.PreviewGroup>
      </div>
      <div className="flex flex-col p-2">
        <p className="font-bold">{product.name}</p>
        <span className="font-bold text-blue-600">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(product.price)}
        </span>
        <span className="font-semibold">
          Stock : <span className="font-bold">{product.stock}</span>
        </span>
      </div>
      <div className="p-1 flex flex-col gap-2">
        <NavLink
          to="#"
          className="border border-gray-400 w-full text-[0.8rem] py-2 text-center font-bold rounded-md hover:text-black"
        >
          Belanja
        </NavLink>
        <button
          onClick={() => handleAddItem(userId, product.id)}
          className="bg-blue-600 w-full text-[0.8rem] py-2 text-center text-white font-bold rounded-md "
        >
          Tambah Keranjang
        </button>
      </div>
    </Skeleton>
  );
};

export default CardProduct;
