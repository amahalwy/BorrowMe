import * as APIUtil from "../util/request_api_util";

export const RECEIVE_REQUESTS = "RECEIVE_POSTINGS";
export const RECEIVE_REQUEST = "RECEIVE_POSTING";
export const REMOVE_REQUEST = "REMOVE_REQUEST";
export const RECEIVE_REQUEST_ERRORS = "RECEIVE_POST_ERRORS";
export const CLEAR_REQUESTS = "CLEAR_REQUESTS";

const receiveRequests = requests => ({
  type: RECEIVE_REQUESTS,
  requests,
});

const receiveRequest = request => ({
  type: RECEIVE_REQUEST,
  request,
});

const removeRequest = requestId => ({
  type: REMOVE_REQUEST,
  requestId
})

const receiveErrors = errors => ({
  type: RECEIVE_REQUEST_ERRORS,
  errors,
});

const clear = () => ({
  type: CLEAR_REQUESTS
})

export const fetchRequest = requestId => dispatch => {
  APIUtil.fetchRequest(requestId)
    .then(request => dispatch(receiveRequest(request)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchRequests = userId => dispatch => {
  APIUtil.fetchRequests(userId)
    .then(requests => dispatch(receiveRequests(requests)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
    // .catch(err => console.log(err));
};

export const createRequest = request => dispatch => {
  APIUtil.createRequest(request)
    .then(request => dispatch(receiveRequest(request)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
    // .catch((err) => console.log(err));
};
  
export const deleteRequest = requestId => dispatch => {
  APIUtil.deleteRequest(requestId)
    .then(() => dispatch(removeRequest(requestId)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
    // .catch((err) => console.log(err));
};

export const clearRequests = () => dispatch => {
  dispatch(clear())
}