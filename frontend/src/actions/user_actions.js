import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const updateUserPhoto = (userId, formData) => (dispatch) =>
  APIUtil.updateUserPhoto(userId, formData)
    .then((user) => dispatch(receiveUser(user))
);