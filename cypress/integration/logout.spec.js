const { StateBuilder } = require("../../src/lib/stateBuilder");
const builder = new StateBuilder();

/**
 * You may ask, why isn't this just put inside the home.spec.js file?
 *
 * The reason is that we want to test a feature and not a page when we work with end to end testing.
 * A page may contain many features and can grow large in scope so by treating each feature as a specific entity
 * to be tested we gain the ability to keep concerns separate and we can introduce environmental differences which
 * won't effect the overall test strategy.
 */
describe("Logout", () => {
  beforeEach(done => {
    builder
      .clear()
      .then(() => builder.createUser().run())
      .then(() => done());
  });

  it("should be possible to logout", () => {
    cy.visit("http://localhost:3000");
    cy.get("a").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
