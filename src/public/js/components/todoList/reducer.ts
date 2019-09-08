import { ADD_TODO, SET_TODOS } from "./events";

export const reducer = (state: any = { todos: [] }, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: state.todos.concat([action.payload]) };

    case SET_TODOS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};
