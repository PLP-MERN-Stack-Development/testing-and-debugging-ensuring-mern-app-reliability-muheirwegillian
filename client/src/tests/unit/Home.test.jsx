import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../components/Home';

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home Component', () => {
    it('should render welcome message', () => {
        renderWithRouter(<Home />);
        expect(screen.getByText(/Welcome to MERN Testing Application/i)).toBeInTheDocument();
    });

    it('should render description text', () => {
        renderWithRouter(<Home />);
        expect(screen.getByText(/This application demonstrates comprehensive testing strategies/i)).toBeInTheDocument();
    });

    it('should render login link', () => {
        renderWithRouter(<Home />);
        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    });

    it('should render register link', () => {
        renderWithRouter(<Home />);
        const registerLink = screen.getByText('Register');
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.closest('a')).toHaveAttribute('href', '/register');
    });
});

