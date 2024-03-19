/// <reference types="cypress" />

describe("Testing crossfit Wod", () => {
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
    cy.visit("https://fitness-app-1.onrender.com/workouts/crossfit");
    cy.url().should("include", "/workouts/crossfit");
  });

  it("Should create a new crossfit workout", () => {
    cy.get('[data-test="newWodBtnCF"]').click();
    cy.get('[data-test="workoutNameCF"]').type("Stephanie");
    cy.get('button[role="combobox"]').first().click();
    cy.get('[data-test="forTimeCF"]').click();
    cy.get('[data-test="roundsCF"]').type("5");
    cy.get('[data-test="addExBtnCF"]').click();
    cy.get('[data-test="newExBtnCF"]').click();
    cy.get('[data-test="repsInputCF"]').type("30");
    cy.get('[data-test="exNameInputCF"]').type("Snatch");
    cy.get('[data-test="menWeightCF"]').type("60");
    cy.get('[data-test="womenWeightCF"]').type("39");
    cy.get('button[role="combobox"]').last().click();
    cy.get('[data-test="barbellCF"]').click();
    cy.get('[data-test="saveExCF"]').click();

    cy.get('[data-test="addExBtnCF"]').click();
    cy.get('[data-test="newExBtnCF"]').click();
    cy.get('[data-test="repsInputCF"]').type("30");
    cy.get('[data-test="exNameInputCF"]').type("Pull Up");
    cy.get('button[role="combobox"]').last().click();
    cy.get('[data-test="bodyweightCF"]').click();
    cy.get('[data-test="saveExCF"]').click();

    cy.get('[data-test="timeCapCF"]').type("15");

    cy.get('[data-test="createWodCF"]').click();
    cy.get('[data-test="Stephanie"]').should("exist");
  });

  it("Should delete a crossfit wod", () => {
    cy.get('[data-test="deleteWodCF"]').click();
    cy.get('[data-test="Stephanie"]').should("not.exist");
  });
});
