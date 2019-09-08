import React from "react";
import { mapDispatchToProps } from "../";
import { TodoList } from "../component";
import { componentSanityChecks } from "../../testUtils/componentSanityChecks";
import { action } from "../../../../../lib/action";
import { ADD_TODO, SET_TODOS } from "../events";
import { shallow } from "enzyme";

const noop = () => {};

describe("TodoList", () => {
  /**
   * Thanks to snapshot testing and a pure visual component we can see that whatever state
   * we create by passing props in will be easy to test.
   */
  componentSanityChecks(
    "TodoList",
    <TodoList todos={["foo"]} getTodos={noop} onSubmit={noop} />
  );
  componentSanityChecks(
    "TodoList - empty",
    <TodoList todos={[]} getTodos={noop} onSubmit={noop} />
  );

  /**
   * Enzyme is great to use when we have an internal state without side effects
   * but it is worth noting that if this component is covered in a end to end test
   * we are likely going to test this behavior twice as it stands to reason that
   * whoever writes either of these tests will check if the typing behavior is correct.
   *
   * I personally prefer to cover tests like these in the end to end test if I can but if you are
   * making a standard component this is a very useful practice.
   */
  it("should display a message when the user is typing", () => {
    const wrapper = shallow(
      <TodoList todos={[]} getTodos={noop} onSubmit={noop} />
    );

    wrapper
      .find('input[name="todo"]')
      .simulate("change", { target: { value: "test input" } });
    wrapper.update();

    const actual = wrapper.find("p").text();
    const expected = "You are typing...";
    expect(expected).toEqual(actual);
  });

  it("should remove the user is typing message when the input is empty", () => {
    const wrapper = shallow(
      <TodoList todos={[]} getTodos={noop} onSubmit={noop} />
    );

    wrapper
      .find('input[name="todo"]')
      .simulate("change", { target: { value: "test input" } });
    wrapper.update();

    wrapper
      .find('input[name="todo"]')
      .simulate("change", { target: { value: "" } });
    wrapper.update();

    const actual = wrapper.find("p").exists();
    const expected = false;
    expect(expected).toEqual(actual);
  });

  it("should submit the todo form", () => {
    const onsubmit = jest.fn();
    const wrapper = shallow(
      <TodoList todos={[]} getTodos={noop} onSubmit={onsubmit} />
    );

    wrapper
      .find('input[name="todo"]')
      .simulate("change", { target: { value: "test input" } });
    wrapper.update();
    wrapper.find("form").simulate("submit");

    expect(onsubmit).toBeCalledTimes(1);
  });

  /**
   * The following tests all have side effects so to capture this logic we want to stub off the
   * problematic network calls and by moving this logic outside of our component it becomes easy
   * to test it without the need to execute the code through our component.
   */
  describe("mapDispatchToProps", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
      mockDispatch.mockClear();
    });

    describe("getTodos", () => {
      it("gets the todos from the server", async () => {
        const mockRes = {
          json: jest.fn().mockReturnValue(["foo"])
        };
        const mockFetch = jest.fn().mockReturnValue(Promise.resolve(mockRes));
        /**
         * By passing in fetch we gain the ability to easily test network logic that would be hard
         * to test otherwise.
         *
         * NOTE: This is not a substitute for using end to end tests since we have no guarantees of
         * what the server will do when we are running the actual system, this test is just to assert
         * that if the component gets what it wants from the server the behavior will be correct.
         */
        const { getTodos } = mapDispatchToProps(mockFetch)(mockDispatch);
        await getTodos();
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith("/api/v1/todos");
        expect(mockDispatch).toBeCalledTimes(1);
        expect(mockDispatch).toBeCalledWith(action(SET_TODOS, ["foo"]));
      });
    });

    describe("onSubmit", () => {
      it("sends a todo to the server", async () => {
        const event = {
          preventDefault: jest.fn(),
          target: {
            todo: {
              value: "foo"
            }
          }
        };
        const opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todo: "foo"
          })
        };
        const mockFetch = jest.fn().mockReturnValue(Promise.resolve());
        const { onSubmit } = mapDispatchToProps(mockFetch)(mockDispatch);
        await onSubmit(event);
        expect(event.preventDefault).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith("/api/v1/todos", opt);
        expect(mockDispatch).toBeCalledTimes(1);
        expect(mockDispatch).toBeCalledWith(action(ADD_TODO, "foo"));
      });
    });
  });
});
