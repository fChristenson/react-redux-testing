import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD_TODO, SET_TODOS } from "./events";
import { TodoList as Component } from "./component";
import { action } from "../../../../lib/action";

const mapStateToProps = (state: any) => {
  return {
    todos: state.todoList.todos
  };
};

export const mapDispatchToProps = (fetch: any) => (dispatch: Dispatch) => {
  return {
    getTodos: async () => {
      const res = await fetch("/api/v1/todos");
      const todos = await res.json();
      dispatch(action(SET_TODOS, todos));
    },
    onSubmit: async (event: any) => {
      const todo = event.target.todo.value;
      event.preventDefault();
      const opt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          todo
        })
      };
      await fetch("/api/v1/todos", opt);
      dispatch(action(ADD_TODO, todo));
    }
  };
};

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps(fetch)
)(Component);
