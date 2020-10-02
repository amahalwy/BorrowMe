import {combineReducers} from 'redux'
import users from './users_reducer'
import postings from './postings_reducer';
import requestorRequests from './requestor_requests_reducer';
import receiverRequests from "./receiver_requests_reducer";
import ownerBookings from "./owner_bookings_reducer";
import renterBookings from "./renter_bookings_reducer";
import modal from './modal_reducer.js';
import map from './map_reducer';

export default combineReducers({
  users,
  postings,
  requestorRequests,
  receiverRequests,
  ownerBookings,
  renterBookings,
  modal,
  map
});