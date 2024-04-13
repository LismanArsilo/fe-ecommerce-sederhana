import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  deleteItemCart,
  getAllCartItems,
  getOneCart,
  updateQtyOrderItemCart,
  updateStatusOrderItemCart,
} from "../thunksRedux/cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    cartsOrder: [],
    cart: null,
    total: null,
    isItemLoading: false,
    isItemError: null,
    isAddLoading: false,
    isAddError: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllCartItems.pending, (state) => {
        state.isItemLoading = false;
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        const carts = action.payload.data;
        state.carts = carts;
        state.total = state.carts
          .filter((itemCart) => itemCart.status_order)
          .reduce((accumulator, itemCart) => {
            return (
              accumulator + parseInt(itemCart.products.price * itemCart.qty)
            );
          }, 0);
        state.cartsOrder = carts.filter((cart) => cart.status_order == true);
        state.isItemLoading = false;
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.isItemLoading = false;
        state.isItemError = action.payload;
      });
    builders
      .addCase(addItemToCart.pending, (state, action) => {
        state.isAddLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.isAddLoading = false;
        state.carts.push(cart);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = action.payload;
      });
    builders
      .addCase(deleteItemCart.pending, (state, action) => {
        state.isAddLoading = true;
      })
      .addCase(deleteItemCart.fulfilled, (state, action) => {
        const cart = action.meta.arg;
        state.isAddLoading = false;
        state.carts = state.carts.filter((item) => item.id !== cart);
        state.total = state.carts
          .filter((itemCart) => itemCart.status_order)
          .reduce((accumulator, itemCart) => {
            return (
              accumulator + parseInt(itemCart.products.price * itemCart.qty)
            );
          }, 0);
      })
      .addCase(deleteItemCart.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = action.payload;
      });
    builders
      .addCase(updateStatusOrderItemCart.pending, (state, action) => {
        state.isAddLoading = true;
      })
      .addCase(updateStatusOrderItemCart.fulfilled, (state, action) => {
        const itemUpdate = action.payload.data;
        state.carts = state.carts.map((item) => {
          if (item.id === itemUpdate.id) {
            return itemUpdate;
          }
          return item;
        });
        state.total = state.carts
          .filter((itemCart) => itemCart.status_order)
          .reduce((accumulator, itemCart) => {
            return (
              accumulator + parseInt(itemCart.products.price * itemCart.qty)
            );
          }, 0);
        state.isAddLoading = true;
      })
      .addCase(updateStatusOrderItemCart.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = action.payload;
      });
    builders
      .addCase(updateQtyOrderItemCart.pending, (state, action) => {
        state.isAddLoading = true;
      })
      .addCase(updateQtyOrderItemCart.fulfilled, (state, action) => {
        const itemUpdate = action.payload.data;
        state.carts = state.carts.map((item) => {
          if (item.id === itemUpdate.id) {
            return itemUpdate;
          }
          return item;
        });
        state.total = state.carts
          .filter((itemCart) => itemCart.status_order)
          .reduce((accumulator, itemCart) => {
            return (
              accumulator + parseInt(itemCart.products.price * itemCart.qty)
            );
          }, 0);
        state.isAddLoading = true;
      })
      .addCase(updateQtyOrderItemCart.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = action.payload;
      });
    builders
      .addCase(getOneCart.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(getOneCart.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.isAddLoading = false;
        state.cart = cart;
      })
      .addCase(getOneCart.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = action.payload;
      });
  },
});
export const cartReducer = cartSlice.reducer;
