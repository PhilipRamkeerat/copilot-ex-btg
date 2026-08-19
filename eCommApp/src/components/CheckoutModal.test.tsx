import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    it('confirms checkout when Continue Checkout is clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        await user.click(screen.getByRole('button', { name: 'Continue Checkout' }));

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onCancel).not.toHaveBeenCalled();
    });

    it('cancels checkout when Return to cart is clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        await user.click(screen.getByRole('button', { name: 'Return to cart' }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onConfirm).not.toHaveBeenCalled();
    });
});