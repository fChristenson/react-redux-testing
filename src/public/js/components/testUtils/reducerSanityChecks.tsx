import { action } from "../../../../lib/action";

// The sanity checks, these are checks that verify that we haven't made a mistake and that our tools work
export const reducerSanityChecks = (
  label: string,
  reducer: (state: any, action: any) => any
) =>
  describe(`Sanity checks for ${label}`, () => {
    it("is defined", () => {
      expect(reducer).toBeDefined();
    });

    it("returns the same state as passed in if no action matches", () => {
      const expected = { foo: 1 };
      const actual = reducer({ foo: 1 }, action("UNMATCHED_ACTION", null));
      expect(expected).toEqual(actual);
    });

    it("returns a initial state if none is passed in", () => {
      const actual = reducer(undefined, action("UNMATCHED_ACTION", null));
      expect(actual).toBeDefined();
      expect(typeof actual).toBe("object");
      expect(actual).not.toBe(null);
      expect(actual).not.toBe(undefined);
      expect(Array.isArray(actual)).toBe(false);
    });
  });
