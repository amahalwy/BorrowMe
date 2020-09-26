import { RECEIVE_USER_ERRORS } from "../actions/user_actions";

const _nullErrors = [];

export default function (state = _nullErrors, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    default:
      return state;
  }
};