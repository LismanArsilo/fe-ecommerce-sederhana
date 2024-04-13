import { authReducer } from "./sliceRedux/authSlice";
import { categoryReducer } from "./sliceRedux/categorySlice";
import { productReducer } from "./sliceRedux/productSlice";
import { colorReducer } from "./sliceRedux/colorSlice";
import { configureStore } from "@reduxjs/toolkit";
import { sizeReducer } from "./sliceRedux/sizeSlice";
import { userCategoryReducer } from "./sliceRedux/userCategorySlice";
import { userProductReducer } from "./sliceRedux/userProductSlice";
import { cartReducer } from "./sliceRedux/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    color: colorReducer,
    size: sizeReducer,
    userCategory: userCategoryReducer,
    userProduct: userProductReducer,
    cart: cartReducer,
  },
});

export default store;
