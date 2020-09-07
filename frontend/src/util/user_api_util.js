import axios from 'axios';

export const updateUserPhoto = (userId, formData) => {
  debugger
  return axios.patch(`/api/users/${userId}`, formData,
    {headers: {
      "Content-Type": `multipart/form-data`
    }
  });
};

export const fetchUser = userId => {
  return axios.get(`/api/profile/${userId}`)
}


export const updateUser = (userId, formData) => {
  return axios.patch(`/api/profile/${userId}`, formData);
};