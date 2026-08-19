import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const product: Product = {
    id: 'apple',
    name: 'Apple',
    price: 2.5,
    image: 'apple.jpg',
    reviews: [],
    inStock: true,
};

const CartConsumer = () => {
    const context = CartContext;

    return (
        <CartContext.Consumer>
            {value => (
                <div>
                    <span data-testid="items">{value?.cartItems.length ?? 0}</span>
                    <span data-testid="quantity">{value?.cartItems[0]?.quantity ?? 0}</span>
                    <button onClick={() => value?.addToCart(product)}>Add</button>
                    <button onClick={() => value?.clearCart()}>Clear</button>
                    {context && null}
                </div>
            )}
        </CartContext.Consumer>
    );
};

describe('CartProvider', () => {
    it('adds a new product and increments its quantity when added again', async () => {
        const user = userEvent.setup();
        render(<CartProvider><CartConsumer /></CartProvider>);

        await user.click(screen.getByRole('button', { name: 'Add' }));
        await user.click(screen.getByRole('button', { name: 'Add' }));

        expect(screen.getByTestId('items')).toHaveTextContent('1');
        expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    });

    it('clears all products from the cart', async () => {
        const user = userEvent.setup();
        render(<CartProvider><CartConsumer /></CartProvider>);

        await user.click(screen.getByRole('button', { name: 'Add' }));
        await user.click(screen.getByRole('button', { name: 'Clear' }));

        expect(screen.getByTestId('items')).toHaveTextContent('0');
        expect(screen.getByTestId('quantity')).toHaveTextContent('0');
    });
});