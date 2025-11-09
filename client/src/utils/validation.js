/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    if (password.length > 50) {
        return { isValid: false, message: 'Password must be less than 50 characters' };
    }
    return { isValid: true, message: 'Password is valid' };
};

/**
 * Validates name format
 * @param {string} name - Name to validate
 * @returns {object} - Validation result with isValid and message
 */
export const validateName = (name) => {
    if (!name || name.trim().length === 0) {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters' };
    }
    if (name.trim().length > 50) {
        return { isValid: false, message: 'Name must be less than 50 characters' };
    }
    return { isValid: true, message: 'Name is valid' };
};

/**
 * Formats a date string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

