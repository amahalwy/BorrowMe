import { connect } from "react-redux";
import {
  login
} from "../../actions/session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.session),
  formType: "Login",
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  // removeErrors: () => dispatch(receiveErrors([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
