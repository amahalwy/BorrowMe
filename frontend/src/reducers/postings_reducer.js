import { RECEIVE_POSTINGS, RECEIVE_NEW_POST } from '../actions/posting_actions'

export default function (state = {}, action) {
  Object.freeze(state)
  // let nextState = Object.assign({}, state);
  
  switch (action.type) {
    case RECEIVE_POSTINGS:
      return Object.assign({}, state, action.postings);
    case RECEIVE_NEW_POST:
      return Object.assign({}, state, {[action.post.id]: action.post})
    default: 
      return state;
  }
}