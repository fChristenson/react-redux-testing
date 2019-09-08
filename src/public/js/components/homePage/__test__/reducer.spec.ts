import { reducer } from "../reducer";
import { action } from "../../../../../lib/action";
import { CURRENT_USER } from "../events";
import { reducerSanityChecks } from "../../testUtils/reducerSanityChecks";

describe("HomePage reducer", () => {
  reducerSanityChecks("HomePage reducer", reducer);

  it("returns the correct state for CURRENT_USER", () => {
    const expected = { user: { name: "foo" } };
    const actual = reducer(
      { user: null },
      action(CURRENT_USER, { name: "foo" })
    );
    expect(expected).toEqual(actual);
  });
});
