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
    cy.get('[data-test="update-profile-btn"]').should('be.visible').click();
    cy.get('[data-test="birthday"]').type('1999-01-01')
    cy.get('[data-test="height"]').clear().type('18')
    cy.get('[data-test="weight"]').clear().type('8')
    cy.get('button[id=":r13:-form-item"]').click()
    cy.get('[data-test="female"]').click()
    cy.get('[data-test="submit-update-btn"]').click()

    cy.get('[data-test="age-profile"]').should('have.text', '25 years old')
    cy.get('[data-test="height-profile"]').should('have.text', '180 cm')
    cy.get('[data-test="weight-profile"]').should('have.text', '80 kg')
    cy.get('[data-test="gender-profile"]').should('have.text','Female')
    cy.get('[data-test="bmi"]').should('have.text', '24.69')
    cy.get('[data-test="result"]').should('have.text', 'You have normal weight')
    cy.get('[data-test="calories"]').should('have.text', 'You need 1636 kcal to maintain your weight')
  });
});
