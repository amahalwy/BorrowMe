import { resolve } from "path";
import * as APIUtil from "../util/postings_api_util";

export const RECEIVE_POSTINGS = "RECEIVE_POSTINGS";
export const RECEIVE_POSTING = "RECEIVE_POSTING";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
export const CLEAR_POSTINGS = "CLEAR_POSTINGS";
export const CLICK_POSTING = "CLICK_POSTING";
export const CLEAR_MODAL = "CLEAR_MODAL";
export const SUCCESS = "SUCCESS";

const receivePostings = postings => ({
  type: RECEIVE_POSTINGS,
  postings,
});

const receivePosting = posting => ({
  type: RECEIVE_POSTING,
  posting,
});

const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors,
});

const clear = () => ({
  type: CLEAR_POSTINGS,
});

const clearMod = () => ({
  type: CLEAR_MODAL
})

const click = (posting) => ({
  type: CLICK_POSTING,
  posting
});

const successPosting = status => ({
  type: SUCCESS,
  status
})

export const fetchPosting = postingId => dispatch => {
  APIUtil.fetchPosting(postingId)
    .then((posting) => dispatch(receivePosting(posting)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchPostings = () => dispatch => {
  APIUtil.fetchPostings()
    .then(postings => dispatch(receivePostings(postings)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};

export const fetchUserPostings = ownerId => dispatch => {
  APIUtil.fetchUserPostings(ownerId)
    .then((postings) => dispatch(receivePostings(postings)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const createPosting = posting => dispatch => {
  APIUtil.createPosting(posting)
    .then(posting => 
      {
        dispatch(receivePosting(posting));
        dispatch(successPosting(posting.status));
      }
    )
    .catch((err) => dispatch(receiveErrors(err.response.data)))
};

export const updatePosting = (postingId, posting) => dispatch => {
  APIUtil.updatePosting(postingId, posting)
    .then(posting => dispatch(receivePosting(posting)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};

export const clearPostings = () => dispatch => {
  dispatch(clear());
}

export const clickPosting = postingId => dispatch => {
  APIUtil.fetchPosting(postingId)
    .then((posting) => dispatch(click(posting)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
}

export const clearModal = () => (dispatch) => {
  dispatch(clearMod());
};