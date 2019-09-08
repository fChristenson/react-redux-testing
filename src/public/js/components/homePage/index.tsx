import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CURRENT_USER } from "./events";
import { HomePage as Component } from "./component";
import { action } from "../../../../lib/action";

const mapStateToProps = (state: any) => {
  return {
    user: state.homePage.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getCurrentUser: async () => {
      const res = await fetch("/api/v1/users/current");
      const user = await res.json();
      if (!user || !user._id) {
        window.location.href = "/login";
      } else {
        dispatch(action(CURRENT_USER, user));
      }
    }
  };
};

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
