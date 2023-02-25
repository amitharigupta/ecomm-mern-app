import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED
} from "../constants/category.constants";

import { BACKEND_API_URL } from "../constants/backend.constants";

export const categoryList = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(BACKEND_API_URL + `/categories/all`);
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAILED,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
