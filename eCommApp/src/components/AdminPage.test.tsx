import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import AdminPage from './AdminPage';

vi.mock('./Header', () => ({ default: () => <header>Header</header> }));
vi.mock('./Footer', () => ({ default: () => <footer>Footer</footer> }));

const renderAdmin = () => render(
    <MemoryRouter>
        <AdminPage />
    </MemoryRouter>,
);

describe('AdminPage', () => {
    it('shows a validation error for non-numeric sale input', async () => {
        const user = userEvent.setup();
        renderAdmin();
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');

        await user.clear(input);
        await user.type(input, 'invalid');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('starts and ends a sale', async () => {
        const user = userEvent.setup();
        renderAdmin();
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');

        await user.clear(input);
        await user.type(input, '20');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('All products are 20% off!')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'End Sale' }));
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        expect(input).toHaveValue('0');
    });
});