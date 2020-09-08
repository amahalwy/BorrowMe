import axios from "axios";

export const fetchBooking = (bookingId) => {
  return axios.get(`/api/bookings`, bookingId);
};

export const fetchUserBookings = (userId) => {
  return axios.get(`/api/users/${userId}/bookings`);
};

export const createBooking = (booking) => {
  return axios.post("/api/bookings", booking);
};

export const deleteBooking = (bookingId) => {
  return axios.delete(`/api/bookings/${bookingId}`);
};
