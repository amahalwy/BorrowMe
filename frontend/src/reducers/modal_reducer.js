import { CLICK_POSTING, CLEAR_MODAL } from "../actions/posting_actions";

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case CLICK_POSTING:
      return Object.assign({}, state, action.posting.data);
    case CLEAR_MODAL:
      return {};
    default:
      return state;
  }
}
