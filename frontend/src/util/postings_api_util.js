import axios from 'axios';

export const fetchPostings = () => {
  return axios.get('/api/postings')
};

export const fetchPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const createPosting = data => {
  debugger
  return axios.post('/api/postings',data)
}

export const updatePosting = (postingId, data) => {
  return axios.patch(`/api/postings/${postingId}`, data);
};