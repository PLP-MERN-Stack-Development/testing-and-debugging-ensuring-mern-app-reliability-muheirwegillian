import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import * as api from '../../utils/api';

jest.mock('../../utils/api');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should complete full login flow', async () => {
    const user = userEvent.setup();
    const mockToken = 'integration-test-token';
    
    api.loginUser.mockResolvedValue({
      success: true,
      token: mockToken,
      user: {
        id: '123',
        name: 'Test User',
        email: 'test@example.com'
      }
    });

    renderWithRouter(<Login />);

    // Fill in form
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');

    // Submit form
    await user.click(screen.getByTestId('submit-button'));

    // Verify API was called with correct data
    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Verify token was stored
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    // Verify navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should handle API errors gracefully', async () => {
    const user = userEvent.setup();
    api.loginUser.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials'
        }
      }
    });

    renderWithRouter(<Login />);

    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'wrongpassword');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    // Verify no navigation occurred
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

