import * as APIUtil from "../util/booking_api_util";

export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_BOOKINGS = "RECEIVE_BOOKINGS";
export const REMOVE_BOOKING = "REMOVE_BOOKING";
export const RECEIVE_BOOKING_ERRORS = "RECEIVE_BOOKING_ERRORS";
export const CLEAR_BOOKINGS = "CLEAR_BOOKINGS";

const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking,
});

const receiveBookings = (bookings) => ({
  type: RECEIVE_BOOKINGS,
  bookings,
});

const removeBooking = (bookingId) => ({
  type: REMOVE_BOOKING,
  bookingId,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_BOOKING_ERRORS,
  errors,
});

const clear = () => ({
  type: CLEAR_BOOKINGS,
});

export const fetchBooking = (bookingId) => (dispatch) => {
  APIUtil.fetchBooking(bookingId)
    .then((booking) => dispatch(receiveBooking(booking)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchUserBookings = (userId) => (dispatch) => {
  APIUtil.fetchUserBookings(userId)
    .then((bookings) => dispatch(receiveBookings(bookings)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const createBooking = (booking) => (dispatch) => {
  APIUtil.createBooking(booking)
    .then((booking) => dispatch(receiveBooking(booking)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const deleteBooking = (bookingId) => (dispatch) => {
  APIUtil.deleteBooking(bookingId)
    .then(() => dispatch(removeBooking(bookingId)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const clearBookings = () => (dispatch) => {
  dispatch(clear());
};