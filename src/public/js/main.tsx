import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { HomePage } from "./components/homePage";
import { LoginPage } from "./components/loginPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
