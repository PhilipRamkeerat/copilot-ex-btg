import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';

vi.mock('./Header', () => ({ default: () => <header>Header</header> }));
vi.mock('./Footer', () => ({ default: () => <footer>Footer</footer> }));

const LocationProbe = () => {
    const location = useLocation();
    return <span data-testid="location">{location.pathname}</span>;
};

const renderLogin = () => render(
    <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
        <LocationProbe />
    </MemoryRouter>,
);

describe('LoginPage', () => {
    it('shows an error for invalid credentials', async () => {
        const user = userEvent.setup();
        renderLogin();

        await user.type(screen.getByPlaceholderText('Username'), 'visitor');
        await user.type(screen.getByPlaceholderText('Password'), 'wrong');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        expect(screen.getByTestId('location')).toHaveTextContent('/login');
    });

    it('navigates to the admin page for valid credentials', async () => {
        const user = userEvent.setup();
        renderLogin();

        await user.type(screen.getByPlaceholderText('Username'), 'admin');
        await user.type(screen.getByPlaceholderText('Password'), 'admin');
        await user.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
        expect(screen.getByTestId('location')).toHaveTextContent('/admin');
    });
});