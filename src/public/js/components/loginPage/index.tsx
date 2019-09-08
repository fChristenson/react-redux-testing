import { connect } from "react-redux";
import { Dispatch } from "redux";
import { LOGIN_ERROR } from "./events";
import { LoginPage as Component } from "./component";
import { action } from "../../../../lib/action";

const mapStateToProps = (state: any) => {
  return {
    showError: state.loginPage.showError
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: async (event: any) => {
      event.preventDefault();
      const [username, password] = event.target;
      const opt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      };
      const res = await fetch("/api/v1/login", opt);
      const user = await res.json();
      if (user && user._id) {
        window.location.href = "/";
      } else {
        dispatch(action(LOGIN_ERROR, true));
      }
    }
  };
};

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
