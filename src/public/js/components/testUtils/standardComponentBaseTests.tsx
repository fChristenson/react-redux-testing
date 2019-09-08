import React from "react";
import { shallow } from "enzyme";

/**
 * The common tests, these are tests that verify that a standard component has the intended behavior we want.
 * These tests are not specific to any one component and are meant to check the basic behavior.
 *
 * If we want we can reuse these sorts of test for standard components that fall in a certain group of element.
 */
export const standardComponentBaseTests = (Component: React.ComponentClass) =>
  describe("Standard component base tests", () => {
    it("should pass through props to the component", () => {
      const customAttributeName = `data-test${Math.random()}`;
      const props = {
        onClick: jest.fn(),
        [customAttributeName]: "foo"
      };
      // @ts-ignore
      const wrapper = shallow(<Component {...props} />);
      wrapper.simulate("click");
      expect(props.onClick).toBeCalledTimes(1);
      // @ts-ignore
      expect(wrapper.first().props()[customAttributeName]).toEqual("foo");
    });
  });
