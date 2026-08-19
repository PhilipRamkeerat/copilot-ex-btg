import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';

describe('basic page components', () => {
    it('renders the storefront header and navigation links', () => {
        render(<MemoryRouter><Header /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: 'The Daily Harvest' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
        expect(screen.getByRole('link', { name: 'Cart' })).toHaveAttribute('href', '/cart');
        expect(screen.getByRole('button', { name: 'Cadastrar cliente' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('renders the footer copyright', () => {
        render(<Footer />);

        expect(screen.getByText(/2025 The Daily Harvest/)).toBeInTheDocument();
    });

    it('renders the home page welcome content', () => {
        render(<MemoryRouter><HomePage /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: 'Welcome to the The Daily Harvest!' })).toBeInTheDocument();
        expect(screen.getByText('Check out our products page for some great deals.')).toBeInTheDocument();
    });
});