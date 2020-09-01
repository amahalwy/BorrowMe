import axios from 'axios';

export const fetchPostings = () => {
  return axios.get('/api/postings')
};

export const fetchPosting = postingId => {
  return axios.get(`/api/postings/${postingId}`)
};

export const createPosting = data => {
  return axios.post('/api/postings', data)
}

