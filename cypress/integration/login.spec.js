describe("Login page", () => {
  it("should be possible to login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name=username]").type("foo");
    cy.get("input[name=password]").type("bar");
    cy.get("input[type=submit]").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should be possible to fail a login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name=username]").type("fail");
    cy.get("input[name=password]").type("fail");
    cy.get("input[type=submit]").click();
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("p").should("contain", "Login failed");
  });
});
