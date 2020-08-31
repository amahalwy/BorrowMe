import { RECEIVE_USER } from "../../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/user_session_actions";

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
    default:
      return state;
  }
}