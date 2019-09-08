import React from "react";
import { Button } from "../Button";
import { shallow } from "enzyme";
import { standardComponentBaseTests } from "../../testUtils/standardComponentBaseTests";
import { componentSanityChecks } from "../../testUtils/componentSanityChecks";

/**
 * A button is what we want to think of as a standard component, in other words it is a component that we will
 * find in many different places in our codebase and this makes it very important to test.
 *
 * The reason is simple, if you want to change something about the button how do you know you didn't break
 * something in one of the places it is being used?
 */
describe("Button", () => {
  componentSanityChecks("Button", <Button />);
  standardComponentBaseTests(Button);

  // component tests, these are the tests that are specific to this component
  it("should set the text of the button", () => {
    const wrapper = shallow(<Button>Hello</Button>);
    expect(wrapper.first().text()).toEqual("Hello");
  });
});
