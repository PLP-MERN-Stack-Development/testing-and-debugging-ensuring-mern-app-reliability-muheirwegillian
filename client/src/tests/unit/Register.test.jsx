import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../components/Register';
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

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render registration form', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });

  it('should show error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Register />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.type(screen.getByTestId('confirm-password-input'), 'differentpassword');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    expect(api.registerUser).not.toHaveBeenCalled();
  });

  it('should show error when password is too short', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Register />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), '12345');
    await user.type(screen.getByTestId('confirm-password-input'), '12345');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('should navigate to login on successful registration', async () => {
    const user = userEvent.setup();
    api.registerUser.mockResolvedValue({ success: true });

    renderWithRouter(<Register />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.type(screen.getByTestId('confirm-password-input'), 'password123');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(api.registerUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});

