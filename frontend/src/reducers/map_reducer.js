import {
  OPEN_MAP,
  CLEAR_MAP
} from "../actions/posting_actions";

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MAP:
      return Object.assign({}, state, { ["res"]: action.status });
    case CLEAR_MAP:
      return {};
    default:
      return state;
  }
}