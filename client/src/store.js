import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { categoryListReducer } from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from "./reducers/userReducer";

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: productListReducer,
  categoryList: categoryListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer
});

const intialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: userInfoStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
