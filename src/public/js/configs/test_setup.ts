// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//@ts-ignore
global.fetch = () => {
  throw new Error(
    "Called global fetch, this function should not be used when running Jest, create local version"
  );
};
