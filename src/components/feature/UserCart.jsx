import React from "react";
import MukenaDummy from "../../assets/mukena.jpg";
import MukenaDummy1 from "../../assets/mukena-1.jpg";
import { Image, Form, Checkbox } from "antd";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";
import {
  deleteItemCart,
  updateQtyOrderItemCart,
  updateStatusOrderItemCart,
} from "../../storeReduxToolkit/thunksRedux/cartThunk";

const UserCart = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleDeleteCartItem = async (itemId) => {
    const response = await dispatch(deleteItemCart(itemId));

    if (response.payload.status == true) {
      showSuccessAlert(response.payload.message);
    } else if (response.payload.status == 400) {
      showErrorAlert(response.payload.data.errors);
    } else {
      showFailAlert(response.payload.data.message);
    }
  };

  const handleChangeOrderStatus = (itemId) => (e) => {
    dispatch(
      updateStatusOrderItemCart({
        itemId: itemId,
        payload: { status: e.target.checked },
      })
    );
  };

  const handleDecrement = (itemId, payload) => {
    dispatch(
      updateQtyOrderItemCart({ itemId: itemId, payload: { type: payload } })
    );
  };

  const handleIncrement = (itemId, payload) => {
    dispatch(
      updateQtyOrderItemCart({ itemId: itemId, payload: { type: payload } })
    );
  };
  return (
    <div className="border border-gray-400 rounded-md p-2">
      <div>
        <Form.Item className="mb-0 pl-3">
          <Checkbox
            onChange={handleChangeOrderStatus(cartItem.id)}
            name="order"
            defaultChecked={cartItem.status_order}
          >
            Pesan
          </Checkbox>
        </Form.Item>
        <div className="flex gap-2 items-center border-b border-b-blue-600 mb-3">
          <span className="text-xs">Kategori :</span>
          <span className="text-sm font-bold">
            {cartItem.products.category?.name}
          </span>
        </div>
      </div>
      <div className="flex gap-2 justify-around">
        <div className="max-w-20 flex-1">
          <Image.PreviewGroup items={[MukenaDummy, MukenaDummy1, MukenaDummy1]}>
            <Image className="w-full" src={MukenaDummy} />
          </Image.PreviewGroup>
        </div>
        <div className="flex flex-col gap-1 w-32">
          <span className="text-nowrap text-ellipsis overflow-hidden text-sm">
            {cartItem.products.name}
          </span>
          <span className="font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(cartItem.products.price)}
          </span>
          <div className="flex items-center justify-center gap-2 ">
            {cartItem.qty <= 1 ? (
              <MdOutlineDeleteSweep
                className="text-3xl font-semibold cursor-pointer hover:text-red-800"
                onClick={() => handleDeleteCartItem(cartItem.id)}
              />
            ) : (
              <CiCircleMinus
                className="text-3xl cursor-pointer hover:text-red-800"
                onClick={() => handleDecrement(cartItem.id, "dec")}
              />
            )}
            <span className="border-b-2 border-b-blue-600 flex-1 text-center">
              {cartItem.qty}
            </span>
            <CiCirclePlus
              className="text-3xl cursor-pointer hover:text-blue-800"
              onClick={() => handleIncrement(cartItem.id, "inc")}
            />
          </div>
        </div>
        <MdOutlineDeleteSweep
          className="text-2xl cursor-pointer hover:text-red-600 hover:scale-110 transition-all ease-in"
          onClick={() => handleDeleteCartItem(cartItem.id)}
        />
      </div>
      <div></div>
    </div>
  );
};

export default UserCart;
