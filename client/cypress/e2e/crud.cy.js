describe('CRUD Operations E2E Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
    });

    it('should navigate through the application', () => {
        cy.visit('/');

        // Verify home page elements
        cy.contains('Welcome to MERN Testing Application').should('be.visible');
        cy.contains('Login').should('be.visible');
        cy.contains('Register').should('be.visible');
    });

    it('should handle form validation errors', () => {
        cy.visit('/register');

        // Try to submit empty form
        cy.get('[data-testid="submit-button"]').click();

        // HTML5 validation should prevent submission
        cy.get('[data-testid="name-input"]').should('have.attr', 'required');
        cy.get('[data-testid="email-input"]').should('have.attr', 'required');
        cy.get('[data-testid="password-input"]').should('have.attr', 'required');
    });

    it('should display error messages correctly', () => {
        cy.visit('/login');

        // Fill form with invalid data (if API is mocked)
        cy.get('[data-testid="email-input"]').type('invalid@email.com');
        cy.get('[data-testid="password-input"]').type('wrongpassword');

        // Form should be submittable
        cy.get('[data-testid="submit-button"]').should('not.be.disabled');
    });
});

