import {combineReducers} from 'redux'
import users from './users_reducer'
import postings from './postings_reducer';
import requestorRequests from './requestor_requests_reducer';
import receiverRequests from "./receiver_requests_reducer";
import bookings from "./bookings_reducer";

export default combineReducers({
  users,
  postings,
  requestorRequests,
  receiverRequests,
  bookings,
});