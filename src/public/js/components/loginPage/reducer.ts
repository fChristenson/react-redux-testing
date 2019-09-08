import { LOGIN_ERROR } from "./events";

export const reducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, showError: action.payload };

    default:
      return state;
  }
};
