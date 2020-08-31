import axios from 'axios';

export const getPostings = () => {
  return axios.get('/api/postings')
};

export const createPosting = data => {
  return axios.post('/api/postings/', data)
}