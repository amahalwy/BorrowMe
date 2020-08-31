import axios from 'axios';

export const getPostings = () => {
  return axios.get('/api/postings')
};

export const getPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const createPosting = data => {
  return axios.post('/api/postings', data)
}

