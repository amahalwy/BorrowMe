import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import PostingsErrorsReducer from "./postings_errors_reducer"
import RequestsErrorsReducer from "./postings_errors_reducer";
import BookingsErrorsReducer from "./postings_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  postings: PostingsErrorsReducer,
  requests: RequestsErrorsReducer,
  bookings: BookingsErrorsReducer,
});
