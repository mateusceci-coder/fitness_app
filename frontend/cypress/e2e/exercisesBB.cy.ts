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
    cy.visit("https://fitness-app-1.onrender.com/login");
    cy.get('[data-test="username-login"]').type("mateusceci");
    cy.get('[data-test="password-login"]').type("asdf!@#$");
    cy.get("form").submit();
    cy.url().should("not.include", "/login");
    cy.visit("https://fitness-app-1.onrender.com/exercises");
    cy.url().should("include", "/exercises");
    cy.get('[data-test="ex-bb"]').click();
  });

  it("Should create new exercise", () => {
    cy.get('[data-test="newExBB"]').click();
    cy.get('[data-test="add-exerciseBB"]').type("Shoulder Press");
    cy.get('[data-test="add-equipmentBB"]').click();
    cy.get('[data-test="add-repMaxBB"]').type("250");
    cy.get('[data-test="add-btnBB"]').click();
  });

  it("Should increase exercises list", () => {
    cy.get('[data-test="tableBB"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="newExBB"]').click();
        cy.get('[data-test="add-exerciseBB"]').type("Bench Press");
        cy.get('[data-test="add-equipmentBB"]').click();
        cy.get('[data-test="add-repMaxBB"]').type("250");
        cy.get('[data-test="add-btnBB"]').click();
        cy.get('[data-test="tableBB"]')
          .find("tr")
          .should("have.length", length + 1);
      });
  });

  it("Should update exercise", () => {
    cy.get('[data-test="Bench Press"]')
      .first()
      .find('[data-test="update-btnBB"]')
      .click();
    cy.get('[data-test="update-repMaxBB"]').clear().type("20");
    cy.get('[data-test="check-btnBB"]').click();
    cy.get('[data-test="Bench Press"]')
      .first()
      .find('[data-test="rmBB"]')
      .should("have.text", "200");
  });

  it("Should delete exercises", () => {
    cy.get('[data-test="tableBB"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="Shoulder Press"]')
          .find('[data-test="delete-btnBB"]')
          .click();
        cy.get('[data-test="Bench Press"]')
          .find('[data-test="delete-btnBB"]')
          .click();
        cy.get('[data-test="tableBB"]')
          .find("tr")
          .should("have.length", length - 2);
      });
  });
});
