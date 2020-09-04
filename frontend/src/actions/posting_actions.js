import * as APIUtil from "../util/postings_api_util";

export const RECEIVE_POSTINGS = "RECEIVE_POSTINGS";
export const RECEIVE_POSTING = "RECEIVE_POSTING";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";

export const receivePostings = postings => {
  return {
    type: RECEIVE_POSTINGS,
    postings,
  };
};

export const receivePosting = posting => {
  return {
    type: RECEIVE_POSTING,
    posting,
  };
};

export const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors,
});

export const fetchPostings = () => (dispatch) => {
  APIUtil.fetchPostings()
    .then(postings => dispatch(receivePostings(postings)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};

export const fetchUserPostings = ownerId => (dispatch) => {
  APIUtil.fetchUserPostings(ownerId)
    .then((postings) => dispatch(receivePostings(postings)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};


export const fetchPosting = postingId => dispatch => {
  APIUtil.fetchPosting(postingId)
    .then(posting => dispatch(receivePosting(posting)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};

export const createPosting = (data) => (dispatch) => {
  APIUtil.createPosting(data)
    .then(posting => dispatch(receivePosting(posting)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};


export const updatePosting = (postingId, data) => (dispatch) => {
  return APIUtil.updatePosting(postingId, data)
    .then((posting) => dispatch(receivePosting(posting)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};
