// import { RECEIVE_USER } from "../../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import {RECEIVE_USER, UPDATE_USER} from "../actions/user_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.user,
      };
    default:
      return state;
  }
}