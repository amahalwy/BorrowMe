import { RECEIVE_POSTINGS, RECEIVE_POSTING } from '../actions/posting_actions'

export default function (state = {}, action) {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_POSTINGS:
      return Object.assign({}, state, action.postings);
    case RECEIVE_POSTING:
      return Object.assign({}, state, {[action.posting.id]: action.posting})
    default: 
      return state;
  }
}