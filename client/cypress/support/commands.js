// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/register');
  cy.get('[data-testid="name-input"]').type(name);
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="confirm-password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('.logout-btn').click();
});

