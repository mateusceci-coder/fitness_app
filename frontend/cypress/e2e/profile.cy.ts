/// <reference types="cypress" />

describe("Login User", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/auth/token/login/", {
      username: "teste1234",
      password: "asdf!@#$",
      email: "testando@email.com",
    });
    cy.visit("http://localhost:5173/login");
    cy.get('[data-test="username-login"]').type("teste1234");
    cy.get('[data-test="password-login"]').type("asdf!@#$");
    cy.get("form").submit();
  });

  it("should login the user", () => {
    cy.url().should("include", "/profile/");
  });

  it("should update profile", () => {
    cy.get('[data-test="update-profile-btn"]').click();
    cy.get('[data-test="birthday"]').type('1999-01-01')
    cy.get('[data-test="height"]').type('180')
  });
});
