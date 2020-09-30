import axios from "axios";

export const fetchBooking = (bookingId) => {
  return axios.get(`/api/bookings/${bookingId}`);
};

export const fetchOwnerBookings = (userId) => {
  return axios.get(`/api/users/${userId}/bookings/owner`);
};

export const fetchRenterBookings = (userId) => {
  return axios.get(`/api/users/${userId}/bookings/renter`);
};

export const createBooking = (booking) => {
  return axios.post("/api/bookings", booking);
};

export const deleteBooking = (bookingId) => {
  return axios.delete(`/api/bookings/${bookingId}`);
};
