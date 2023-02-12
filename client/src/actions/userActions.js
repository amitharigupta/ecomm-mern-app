import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED
} from "../constants/user.constants";
import { BACKEND_API_URL } from "../constants/backend.constants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      BACKEND_API_URL + "/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.data));
    localStorage.setItem("token", JSON.stringify(data.data.token));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, cpassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      BACKEND_API_URL + "/users/register",
      { name, email, password, cpassword },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.data));
    localStorage.setItem("token", JSON.stringify(data.data.token));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id, getState) => (dispatch, getState)  => {
  try {
    dispatch({
      type: USER_DETAILS_FAILED
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = axios.get(`${BACKEND_API_URL}/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
