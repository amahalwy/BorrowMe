import axios from 'axios';

export const fetchPostings = () => {
  return axios.get('/api/postings')
};

export const fetchPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const fetchUserPostings = ownerId => {
  return axios.get(`/api/users/${ownerId}/postings`);
};

export const createPosting = posting => {
  return axios.post('/api/postings', posting)
}

export const updatePosting = (postingId, data) => {
  return axios.patch(`/api/postings/${postingId}`, data);
};