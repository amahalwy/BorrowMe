import axios from 'axios';

export const fetchPostings = () => {
  return axios.get('/api/postings')
};

export const fetchUserPostings = ownerId => {
  return axios.get("/api/postings", {data: ownerId});
};

export const fetchPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const createPosting = data => {
  return axios.post('/api/postings', data)
}

export const updatePosting = (postingId, data) => {
  return axios.patch(`/api/postings/${postingId}`, data);
};