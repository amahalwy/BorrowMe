import {combineReducers} from 'redux'
import users from './users_reducer'
import postings from './postings_reducer';

export default combineReducers({
  users,
  postings
  // reviews 
})