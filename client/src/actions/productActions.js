import axios from "axios";
import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/product.constants";

import { BACKEND_API_URL } from "../constants/backend.constants";

export const productList = (currentPage = 1, price = [0, 25000], categoryId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    let URL = BACKEND_API_URL + `/products/all?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    if(categoryId && categoryId != "") {
      URL = BACKEND_API_URL + `/products/all?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&categoryId=${categoryId}`
    }
    const { data } = await axios.get(URL);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const productDetailsList = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(BACKEND_API_URL + `/products/${id}`);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAILED,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
