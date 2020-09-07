import axios from "axios";

export const fetchRequest = requestId => {
  return axios.get(`/api/requests`, requestId)
}

export const fetchRequests = userId => {
  return axios.get('/api/requests', userId)
}

export const createRequest = request => {
  return axios.post("/api/requests", request,
    {
      headers: {
        "Content-Type": `multipart/form-data`
      }
    })
}

export const deleteRequest = requestId => {
  return axios.delete(`/api/request`, requestId)
}