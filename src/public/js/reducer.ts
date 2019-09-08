import { combineReducers } from "redux";
import { reducer as loginReducer } from "./components/loginPage/reducer";
import { reducer as homeReducer } from "./components/homePage/reducer";
import { reducer as todoListReducer } from "./components/todoList/reducer";

export const reducer = combineReducers({
  loginPage: loginReducer,
  homePage: homeReducer,
  todoList: todoListReducer
});
