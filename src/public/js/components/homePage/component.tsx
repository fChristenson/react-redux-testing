import React from "react";
import { TodoList } from "../todoList";

/**
 * We are not unit testing this component because this is a page component and such a component will over time
 * grow to contain many different subcomponents and features that will quickly become very slow to maintain
 * through unit testing.
 *
 * To test this component you would have to retest each level of the component tree over and over to assert
 * that the expected behavior of a subcomponent is still working in the larger component.
 *
 * If the subcomponents are made up of well tested standard components testing at this level can be
 * focused on the interaction with features.
 *
 * A more flexible approach to this problem is to deal with it through end to end tests that simulate a user
 * interacting with a feature.
 */
export class HomePage extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    if (!this.props.user) return null;
    return (
      <div>
        <h1>Home</h1>
        <TodoList />
        <a href="/logout">logout</a>
      </div>
    );
  }
}
