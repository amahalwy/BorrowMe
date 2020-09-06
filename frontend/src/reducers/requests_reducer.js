import {
  RECEIVE_REQUESTS,
  RECEIVE_REQUEST,
  REMOVE_REQUEST,
} from "../actions/request_actions";

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REQUESTS:
      return Object.assign({}, state, action.postings.data);
    case RECEIVE_REQUEST:
      return Object.assign({}, state, {
        [action.posting.data._id]: action.posting.data,
      });
    case REMOVE_REQUEST: 
      let newState = Object.assign({}, state)
      delete newState[action.requestId];
      return newState;
    default:
      return state;
  }
}
