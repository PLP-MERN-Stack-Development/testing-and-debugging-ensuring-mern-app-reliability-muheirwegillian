import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error</div>;
};

describe('ErrorBoundary', () => {
    beforeEach(() => {
        // Suppress console.error for error boundary tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    it('should render children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should display error UI when child component throws', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
        expect(screen.getByText(/Try again/i)).toBeInTheDocument();
    });

    it('should allow recovery from error', () => {
        const { rerender } = render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

        // Click try again button
        const tryAgainButton = screen.getByText(/Try again/i);
        tryAgainButton.click();

        // Rerender with no error
        rerender(
            <ErrorBoundary>
                <ThrowError shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.getByText('No error')).toBeInTheDocument();
    });
});

