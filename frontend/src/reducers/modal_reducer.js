import {
  CLICK_POSTING,
  CLEAR_MODAL,
  SUCCESS,
} from "../actions/posting_actions";
import { UPDATE_SUCCESS } from "../actions/user_actions";
import { CLICK_BOOKING } from '../actions/booking_actions';
import { CLICK_REQUEST } from '../actions/request_actions';

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case CLICK_POSTING:
      return Object.assign({}, state, action.posting.data);
    case CLICK_BOOKING:
      return Object.assign({}, state, action.booking.data);
    case CLICK_REQUEST:
      return Object.assign({}, state, action.request.data);
    case CLEAR_MODAL:
      return {};
    case SUCCESS:
      return Object.assign({}, state, { ["res"]: action.status });
    case UPDATE_SUCCESS:
      return Object.assign({}, state, { ["res"]: action.status });
    default:
      return state;
  }
}
