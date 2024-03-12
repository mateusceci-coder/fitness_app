/// <reference types="cypress" />

describe("Testing Crossfit Exercises", () => {
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
    cy.url().should("not.include", "/login");
    cy.visit("http://localhost:5173/exercises");
    cy.url().should("include", "/exercises");
    cy.get('[data-test="ex-cf"]').click();
  });

  it("Should create new exercise", () => {
    cy.get('[data-test="tableBB"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="newExCF"]').click();
        cy.get('[data-test="add-exerciseCF"]').type("Bench Press");
        cy.get('[data-test="add-equipmentCF"]').click();
        cy.get('[data-test="add-repMaxCF"]').type("250");
        cy.get('[data-test="add-btnCF"]').click();
        cy.get('[data-test="tableCF"]')
          .find("tr")
          .should("have.length", length + 1);
      });
  });

  it("Should delete exercise", () => {
    cy.get('[data-test="tableCF"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="table-row"]')
          .first()
          .find('[data-test="delete-btnCF"]')
          .click();
        cy.get('[data-test="tableCF"]')
          .find("tr")
          .should("have.length", length - 1);
      });
  });

  it("Should update exercise", () => {
    cy.get('[data-test="table-row"]')
      .first()
      .find('[data-test="update-btnCF"]')
      .click();
    cy.get('[data-test="update-repMaxCF"]').clear().type("20");
    cy.get('[data-test="check-btnCF"]').click();

    cy.get('[data-test="table-row"]')
      .first()
      .find('[data-test="rmCF"]')
      .should("have.text", "200");
  });
});
