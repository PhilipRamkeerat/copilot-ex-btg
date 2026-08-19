import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App routing', () => {
    it('renders the home page at the root route', () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: 'Welcome to the The Daily Harvest!' })).toBeInTheDocument();
    });

    it('renders an empty cart at the cart route', () => {
        render(<MemoryRouter initialEntries={['/cart']}><App /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});