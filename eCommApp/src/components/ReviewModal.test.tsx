import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
    id: 'apple',
    name: 'Apple',
    price: 2.5,
    reviews: [],
    inStock: true,
};

describe('ReviewModal', () => {
    it('renders nothing when no product is selected', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('shows an empty state when the product has no reviews', () => {
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={vi.fn()} />);

        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    it('submits the entered review and resets the form', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

        await user.type(screen.getByPlaceholderText('Your name'), 'Taylor');
        await user.type(screen.getByPlaceholderText('Your review'), 'Fresh and crisp');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(onSubmit).toHaveBeenCalledWith({
            author: 'Taylor',
            comment: 'Fresh and crisp',
            date: expect.any(String),
        });
        expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Your review')).toHaveValue('');
    });

    it('renders existing reviews and closes when Close is clicked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        const reviewedProduct = {
            ...product,
            reviews: [{ author: 'Morgan', comment: 'Excellent', date: '2025-01-01T00:00:00.000Z' }],
        };

        render(<ReviewModal product={reviewedProduct} onClose={onClose} onSubmit={vi.fn()} />);

        expect(screen.getByText('Morgan')).toBeInTheDocument();
        expect(screen.getByText('Excellent')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Close' }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});