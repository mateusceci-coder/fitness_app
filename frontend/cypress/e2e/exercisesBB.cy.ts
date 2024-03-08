/// <reference types="cypress" />

describe("", () => {
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
    cy.url().should('not.include', '/login')
    })

      it("Should create new exercise", () => {
      cy.visit("http://localhost:5173/exercises");
      cy.url().should("include", "/exercises");
      cy.get('[data-test="ex-bb"]').click();


      cy.get('[data-test="tableBB"]').find('tr').its('length').then((length) => {
      cy.get('[data-test="newExBB"]').click();
      cy.get('[data-test="add-exerciseBB"]').type("Leg Press")
      cy.get('[data-test="add-equipmentBB"]').click()
      cy.get('[data-test="add-repMaxBB"]').type('250')
      cy.get('[data-test="add-btnBB"]').click()

      cy.get('[data-test="tableBB"]').find('tr').should('have.length', length + 1)
      })
    })


})