import {
    isValidEmail,
    validatePassword,
    validateName,
    formatDate,
    capitalize
} from '../../utils/validation';

describe('Validation Utilities', () => {
    describe('isValidEmail', () => {
        it('should return true for valid email addresses', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('user+tag@example.com')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('user@')).toBe(false);
            expect(isValidEmail('user@domain')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should return valid for passwords with 6+ characters', () => {
            const result = validatePassword('password123');
            expect(result.isValid).toBe(true);
            expect(result.message).toBe('Password is valid');
        });

        it('should return invalid for empty password', () => {
            const result = validatePassword('');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Password is required');
        });

        it('should return invalid for passwords shorter than 6 characters', () => {
            const result = validatePassword('12345');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Password must be at least 6 characters');
        });

        it('should return invalid for passwords longer than 50 characters', () => {
            const longPassword = 'a'.repeat(51);
            const result = validatePassword(longPassword);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Password must be less than 50 characters');
        });
    });

    describe('validateName', () => {
        it('should return valid for names with 2+ characters', () => {
            const result = validateName('John Doe');
            expect(result.isValid).toBe(true);
            expect(result.message).toBe('Name is valid');
        });

        it('should return invalid for empty name', () => {
            const result = validateName('');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Name is required');
        });

        it('should return invalid for names shorter than 2 characters', () => {
            const result = validateName('A');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Name must be at least 2 characters');
        });

        it('should return invalid for names longer than 50 characters', () => {
            const longName = 'A'.repeat(51);
            const result = validateName(longName);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Name must be less than 50 characters');
        });

        it('should handle whitespace correctly', () => {
            const result = validateName('   ');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Name is required');
        });
    });

    describe('formatDate', () => {
        it('should format valid date strings', () => {
            const date = new Date('2023-12-25');
            const formatted = formatDate(date);
            expect(formatted).toMatch(/December 25, 2023/);
        });

        it('should return empty string for invalid dates', () => {
            expect(formatDate('invalid-date')).toBe('');
            expect(formatDate(null)).toBe('');
            expect(formatDate(undefined)).toBe('');
        });
    });

    describe('capitalize', () => {
        it('should capitalize first letter and lowercase rest', () => {
            expect(capitalize('hello')).toBe('Hello');
            expect(capitalize('WORLD')).toBe('World');
            expect(capitalize('tEsT')).toBe('Test');
        });

        it('should return empty string for empty input', () => {
            expect(capitalize('')).toBe('');
            expect(capitalize(null)).toBe('');
            expect(capitalize(undefined)).toBe('');
        });
    });
});

