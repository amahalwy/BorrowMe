import {
  RECEIVE_RECEIVER_REQUESTS,
  RECEIVE_REQUEST,
  REMOVE_REQUEST,
  CLEAR_REQUESTS,
} from "../actions/request_actions";

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RECEIVER_REQUESTS:
      return Object.assign({}, state, action.requests.data);
    case RECEIVE_REQUEST:
      return Object.assign({}, state, action.request.data);
    case REMOVE_REQUEST:
      let newState = Object.assign({}, state);
      delete newState[action.requestId];
      return newState;
    case CLEAR_REQUESTS:
      return {};
    default:
      return state;
  }
}
