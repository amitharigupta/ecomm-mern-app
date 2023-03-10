import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_INFO } from "../constants/cart.constants";
import { BACKEND_API_URL } from "../constants/backend.constants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(BACKEND_API_URL + `/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.data._id,
            name: data.data.name,
            image: data.data.images[0],
            price: data.data.price,
            countInStock: data.data.countInStock,
            qty
        }
    });

    localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItem));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
  
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };