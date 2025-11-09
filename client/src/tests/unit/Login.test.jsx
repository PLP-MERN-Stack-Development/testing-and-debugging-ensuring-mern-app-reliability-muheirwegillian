import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import * as api from '../../utils/api';

// Mock the API module
jest.mock('../../utils/api');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('should render login form', () => {
        renderWithRouter(<Login />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('should update form fields when user types', async () => {
        const user = userEvent.setup();
        renderWithRouter(<Login />);

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should show error message on login failure', async () => {
        const user = userEvent.setup();
        api.loginUser.mockRejectedValue(new Error('Invalid credentials'));

        renderWithRouter(<Login />);

        await user.type(screen.getByTestId('email-input'), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'wrongpassword');
        await user.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(screen.getByText(/An error occurred during login/i)).toBeInTheDocument();
        });
    });

    it('should navigate to dashboard on successful login', async () => {
        const user = userEvent.setup();
        const mockToken = 'mock-token-123';
        api.loginUser.mockResolvedValue({
            success: true,
            token: mockToken
        });

        renderWithRouter(<Login />);

        await user.type(screen.getByTestId('email-input'), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'password123');
        await user.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe(mockToken);
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('should disable submit button while loading', async () => {
        const user = userEvent.setup();
        api.loginUser.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        renderWithRouter(<Login />);

        await user.type(screen.getByTestId('email-input'), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'password123');
        const submitButton = screen.getByTestId('submit-button');
        await user.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Logging in...');
    });
});

