/// <reference types="cypress" />

describe("Testing Bodybuilding Exercises", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/auth/token/login/", {
      username: "mateusceci",
      password: "asdf!@#$",
      email: "testando@email.com",
    });
    cy.visit("http://localhost:5173/login");
    cy.get('[data-test="username-login"]').type("mateusceci");
    cy.get('[data-test="password-login"]').type("asdf!@#$");
    cy.get("form").submit();
    cy.url().should("not.include", "/login");
    cy.visit("http://localhost:5173/exercises");
    cy.url().should("include", "/exercises");
    cy.get('[data-test="ex-cf"]').click();
  });

  it("Should create new exercise", () => {
    cy.get('[data-test="newExCF"]').click();
    cy.get('[data-test="add-exerciseCF"]').type("Squat Clean");
    cy.get('[data-test="add-equipmentCF"]').click();
    cy.get('[data-test="add-repMaxCF"]').type("120");
    cy.get('[data-test="add-btnCF"]').click();
  });

  it("Should increase exercises list", () => {
    cy.get('[data-test="tableCF"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="newExCF"]').click();
        cy.get('[data-test="add-exerciseCF"]').type("Push Press");
        cy.get('[data-test="add-equipmentCF"]').click();
        cy.get('[data-test="add-repMaxCF"]').type("90");
        cy.get('[data-test="add-btnCF"]').click();
        cy.get('[data-test="tableCF"]')
          .find("tr")
          .should("have.length", length + 1);
      });
  });

  it("Should update exercise", () => {
    cy.get('[data-test="Squat Clean"]')
      .find('[data-test="update-btnCF"]')
      .click();
    cy.get('[data-test="update-repMaxCF"]').clear().type("20");
    cy.get('[data-test="check-btnCF"]').click();
    cy.get('[data-test="Squat Clean"]')
      .find('[data-test="rmCF"]')
      .should("have.text", "200");
  });

  it("Should delete exercises", () => {
    cy.get('[data-test="tableCF"]')
      .find("tr")
      .its("length")
      .then((length) => {
        cy.get('[data-test="Push Press"]')
          .find('[data-test="delete-btnCF"]')
          .click();
        cy.get('[data-test="Squat Clean"]')
          .find('[data-test="delete-btnCF"]')
          .click();
        cy.get('[data-test="tableCF"]')
          .find("tr")
          .should("have.length", length - 2);
      });
  });
});
