import * as APIUtil from "../util/post_api_util";

export const RECEIVE_POSTINGS = "RECEIVE_POSTINGS";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";

export const receivePostings = (posts) => {
  return {
    type: RECEIVE_POSTINGS,
    posts,
  };
};

export const receiveNewPost= (post) => {
  return {
    type: RECEIVE_NEW_POST,
    post,
  };
};

export const receiveErrors = (errors) => ({
  type: RECEIVE_POST_ERRORS,
  errors,
});

export const fetchPosts = () => (dispatch) => {
  return APIUtil.getPosts()
    .then((posts) => dispatch(receivePosts(posts)))
    .catch((err) => console.log(err));
};

export const createNewPost = (data) => (dispatch) => {
  return APIUtil.createPost(data)
    .then((post) => dispatch(receiveNewPost(post)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const updatePost = (data) => (dispatch) => {
  return APIUtil.updatePost(data)
    .then((post) => dispatch(receiveNewPost(post)))
    .catch((err) => console.log(err));
};
