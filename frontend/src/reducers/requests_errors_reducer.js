import { RECEIVE_REQUEST_ERRORS } from "../actions/posting_actions";

const _nullErrors = [];

const PostingsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REQUEST_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default PostingsErrorsReducer;
