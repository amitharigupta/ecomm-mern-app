import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT } from "../constants/user.constants";

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, userInfo: {} };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return { loading: false, userInfo: null };
        default :
            return state;
    }
}

