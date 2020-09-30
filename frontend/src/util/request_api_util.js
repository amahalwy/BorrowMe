import axios from "axios";

export const fetchRequest = requestId => {
  return axios.get(`/api/requests/${requestId}`);
}

export const fetchRequestorRequests = userId => {
  return axios.get(`/api/users/${userId}/requests/requestor`);
}

export const fetchReceiverRequests = userId => {
  return axios.get(`/api/users/${userId}/requests/receiver`);
}

export const createRequest = request => {
  return axios.post("/api/requests", request)
}

export const deleteRequest = requestId => {
  return axios.delete(`/api/requests/${requestId}`)
}