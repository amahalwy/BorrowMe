import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import PostingsErrorsReducer from "./postings_errors_reducer"
export default combineReducers({
  session: SessionErrorsReducer,
  postings: PostingsErrorsReducer
});
