import axios from 'axios';

export const fetchPostings = () => {
  return axios.get('/api/postings')
};

export const fetchUserPostings = userId => {
  return axios.get(`/api/profile/${userId}`);
};

export const fetchPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const createPosting = posting => {
  return axios.post('/api/postings', posting)
}

export const updatePosting = (postingId, data) => {
  return axios.patch(`/api/postings/${postingId}`, data);
};