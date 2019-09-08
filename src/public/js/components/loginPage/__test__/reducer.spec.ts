import { reducer } from "../reducer";
import { action } from "../../../../../lib/action";
import { LOGIN_ERROR } from "../events";
import { reducerSanityChecks } from "../../testUtils/reducerSanityChecks";

describe("Loginpage reducer", () => {
  reducerSanityChecks("Loginpage reducer", reducer);

  it("returns the correct state for LOGIN_ERROR", () => {
    const expected = { showError: true };
    const actual = reducer({ showError: false }, action(LOGIN_ERROR, true));
    expect(expected).toEqual(actual);
  });
});
