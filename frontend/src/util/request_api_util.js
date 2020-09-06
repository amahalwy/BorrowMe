import axios from "axios";

export const fetchRequest = requestId => {
  return axios.get(`/api/requests/${requestId}`)
}

export const fetchRequests = userId => {
  return axios.get('/api/requests', {data: userId})
}

export const createRequest = request => {
  return axios.post("/api/requests", {data: request})
}

export const deleteRequest = requestId => {
  return axios.delete(`/api/request/${requestId}`)
}