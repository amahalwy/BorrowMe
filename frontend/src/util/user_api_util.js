import axios from 'axios';

export const fetchUser = userId => {
  return axios.get(`/api/users/${userId}`)
}

export const updateUserPhoto = (userId, formData) => {
  return axios.put(`/api/users/${userId}`, formData,
    {headers: {
      "Content-Type": `multipart/form-data`
    }}
  );
};