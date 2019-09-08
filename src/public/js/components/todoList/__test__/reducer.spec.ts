import { reducer } from "../reducer";
import { action } from "../../../../../lib/action";
import { ADD_TODO, SET_TODOS } from "../events";
import { reducerSanityChecks } from "../../testUtils/reducerSanityChecks";

describe("TodoList reducer", () => {
  reducerSanityChecks("TodoList reducer", reducer);

  it("returns the correct state for ADD_TODO", () => {
    const expected = { todos: ["foo"] };
    const actual = reducer({ todos: [] }, action(ADD_TODO, "foo"));
    expect(expected).toEqual(actual);
  });

  it("returns the correct state for SET_TODOS", () => {
    const expected = { todos: ["foo", "bar"] };
    const actual = reducer(
      { todos: ["foo", "baz"] },
      action(SET_TODOS, ["foo", "bar"])
    );
    expect(expected).toEqual(actual);
  });
});
