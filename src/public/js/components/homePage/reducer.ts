import { CURRENT_USER } from "./events";

export const reducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
