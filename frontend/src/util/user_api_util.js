import axios from 'axios';

export const updateUserPhoto = (userId, formData) => {
  debugger
  return axios.patch(`/api/users/${userId}`, formData,
    {headers: {
      // accept: "application/json",
      // "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data`
    }
  });
};