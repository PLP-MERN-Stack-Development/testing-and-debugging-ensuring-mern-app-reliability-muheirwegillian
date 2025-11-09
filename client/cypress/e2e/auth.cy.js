describe('Authentication E2E Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
  });

  describe('Registration Flow', () => {
    it('should complete user registration', () => {
      cy.visit('/');
      
      // Navigate to register page
      cy.contains('Register').click();
      cy.url().should('include', '/register');

      // Fill registration form
      cy.get('[data-testid="name-input"]').type('E2E Test User');
      cy.get('[data-testid="email-input"]').type('e2e@test.com');
      cy.get('[data-testid="password-input"]').type('password123');
      cy.get('[data-testid="confirm-password-input"]').type('password123');

      // Submit form
      cy.get('[data-testid="submit-button"]').click();

      // Should redirect to login page
      cy.url().should('include', '/login');
    });

    it('should show error for password mismatch', () => {
      cy.visit('/register');

      cy.get('[data-testid="name-input"]').type('Test User');
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('password123');
      cy.get('[data-testid="confirm-password-input"]').type('differentpassword');

      cy.get('[data-testid="submit-button"]').click();

      cy.contains('Passwords do not match').should('be.visible');
    });

    it('should show error for short password', () => {
      cy.visit('/register');

      cy.get('[data-testid="name-input"]').type('Test User');
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('12345');
      cy.get('[data-testid="confirm-password-input"]').type('12345');

      cy.get('[data-testid="submit-button"]').click();

      cy.contains('Password must be at least 6 characters').should('be.visible');
    });
  });

  describe('Login Flow', () => {
    it('should navigate to login page', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.url().should('include', '/login');
    });

    it('should display login form', () => {
      cy.visit('/login');
      cy.get('[data-testid="email-input"]').should('be.visible');
      cy.get('[data-testid="password-input"]').should('be.visible');
      cy.get('[data-testid="submit-button"]').should('be.visible');
    });

    it('should handle form input', () => {
      cy.visit('/login');
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="email-input"]').should('have.value', 'test@example.com');
      
      cy.get('[data-testid="password-input"]').type('password123');
      cy.get('[data-testid="password-input"]').should('have.value', 'password123');
    });
  });

  describe('Navigation', () => {
    it('should navigate between pages', () => {
      cy.visit('/');
      cy.contains('MERN Testing Application').should('be.visible');

      cy.contains('Login').click();
      cy.url().should('include', '/login');

      cy.visit('/');
      cy.contains('Register').click();
      cy.url().should('include', '/register');
    });
  });
});

