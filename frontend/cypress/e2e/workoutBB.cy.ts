/// <reference types="cypress" />

describe("Testing Bodybuilding Workout", () => {
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
    cy.visit("https://fitness-app-1.onrender.com/workouts/bodybuilding");
    cy.url().should("include", "/workouts/bodybuilding");
  });

  it("Should create a new bodybuilding workout", () => {
    cy.get('[data-test="newWorkBtnBB"]').click();
    cy.get('[data-test="workoutName"]').type("Shoulder Day");
    cy.get('[data-test="addExBtnBB"]').click();
    cy.get('[data-test="newExBtnBB"]').click();
    cy.get('[data-test="exNameInputBB"]').type("Shoulder Press");
    cy.get('[data-test="seriesInputBB"]').type("4");
    cy.get('[data-test="repsInputBB"]').type("8");
    cy.get('button[role="combobox"]').click();
    cy.get('[data-test="barbellBB"]').click();
    cy.get('[data-test="saveExBB"]').click();

    cy.get('[data-test="addExBtnBB"]').click();
    cy.get('[data-test="exNameInputBB"]').type("Arnold Press");
    cy.get('[data-test="seriesInputBB"]').type("3");
    cy.get('[data-test="repsInputBB"]').type("12");
    cy.get('button[role="combobox"]').click();
    cy.get('[data-test="dumbbellBB"]').click();
    cy.get('[data-test="saveExBB"]').click();

    cy.get('[data-test="createWorkoutBB"]').click();
    cy.get('[data-test="Shoulder Day"]').should("exist");
  });

  it("Should delete a bodybuilding workout", () => {
    cy.get('[data-test="deleteWorkoutBB"]').click();
    cy.get('[data-test="Shoulder Day"]').should("not.exist");
  });
});
