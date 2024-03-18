/// <reference types="cypress" />

describe("Testing Bodybuilding Exercises", () => {
  beforeEach(() => {
    cy.request(
      "POST",
      "https://fitness-app-y9fc.onrender.com/auth/token/login/",
      {
        username: "mateusceci",
        password: "asdf!@#$",
        email: "testando@email.com",
      }
    );
    cy.visit("http://localhost:5173/login");
    cy.get('[data-test="username-login"]').type("mateusceci");
    cy.get('[data-test="password-login"]').type("asdf!@#$");
    cy.get("form").submit();
    cy.url().should("not.include", "/login");
    cy.visit("http://localhost:5173/");
  });

  it("should not have a 'create your account' button", () => {
    cy.get("button").should("not.contain", "create your account");
  });

  it("should not have a 'login' button", () => {
    cy.get("button").should("not.contain", "login");
  });

  it("should logout and have the create account and login buttons", () => {
    cy.get('[data-test="logout"]').click();
    cy.get('[data-test="confirm-logout"]').click();
    cy.visit("http://localhost:5173/");
    cy.get("button").should("contain", "Create Your Account");
    cy.get("button").should("contain", "Login");
  });
});
