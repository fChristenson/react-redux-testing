const { StateBuilder } = require("../../src/lib/stateBuilder");
const builder = new StateBuilder();

describe("Home page", () => {
  beforeEach(done => {
    builder.clear().then(() => done());
  });

  it("should not be possible to go to the homepage without logging in first", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1")
      .first()
      .should("contain", "Login");
  });

  it("should be possible to go to the homepage", done => {
    builder
      .createUser()
      .run()
      .then(() => {
        cy.visit("http://localhost:3000/");
        cy.get("h1")
          .first()
          .should("contain", "Home");
        cy.url()
          .should("eq", "http://localhost:3000/")
          .then(() => done());
      });
  });
});
