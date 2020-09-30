import * as APIUtil from "../util/booking_api_util";

export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_OWNER_BOOKINGS = "RECEIVE_OWNER_BOOKINGS";
export const RECEIVE_RENTER_BOOKINGS = "RECEIVE_RENTER_BOOKINGS";
export const REMOVE_BOOKING = "REMOVE_BOOKING";
export const RECEIVE_BOOKING_ERRORS = "RECEIVE_BOOKING_ERRORS";
export const CLEAR_BOOKINGS = "CLEAR_BOOKINGS";
export const CLICK_BOOKING = "CLICK_BOOKING";
export const CLEAR_MODAL = "CLEAR_MODAL";

const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking,
});

const receiveOwnerBookings = (bookings) => ({
  type: RECEIVE_OWNER_BOOKINGS,
  bookings,
});

const receiveRenterBookings = (bookings) => ({
  type: RECEIVE_RENTER_BOOKINGS,
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

const clearMod = () => ({
  type: CLEAR_MODAL
})

const click = (booking) => ({
  type: CLICK_BOOKING,
  booking
});

export const fetchBooking = (bookingId) => (dispatch) => {
  APIUtil.fetchBooking(bookingId)
    .then((booking) => dispatch(receiveBooking(booking)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchOwnerBookings = (userId) => (dispatch) => {
  APIUtil.fetchOwnerBookings(userId)
    .then((bookings) => dispatch(receiveOwnerBookings(bookings)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchRenterBookings = (userId) => (dispatch) => {
  APIUtil.fetchRenterBookings(userId)
    .then((bookings) => dispatch(receiveRenterBookings(bookings)))
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

export const clickBooking = bookingId => dispatch => {
  APIUtil.fetchBooking(bookingId)
    .then((booking) => dispatch(click(booking)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
}

export const clearModal = () => (dispatch) => {
  dispatch(clearMod());
};