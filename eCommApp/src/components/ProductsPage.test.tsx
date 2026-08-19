import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';

vi.mock('./Header', () => ({ default: () => <header>Header</header> }));
vi.mock('./Footer', () => ({ default: () => <footer>Footer</footer> }));

const products: Product[] = [
    {
        id: 'apple',
        name: 'Apple',
        price: 2.5,
        description: 'Crisp apple',
        image: 'apple.jpg',
        reviews: [],
        inStock: true,
    },
    {
        id: 'pear',
        name: 'Pear',
        price: 3,
        image: 'pear.jpg',
        reviews: [],
        inStock: false,
    },
];

const fetchedProducts = [
    products[0],
    { ...products[0], id: 'grapes', name: 'Grapes' },
    { ...products[0], id: 'orange', name: 'Orange' },
    products[1],
];

const mockCartContext = {
    cartItems: [],
    addToCart: vi.fn(),
    clearCart: vi.fn(),
};

const renderProducts = () => render(
    <CartContext.Provider value={mockCartContext}>
        <ProductsPage />
    </CartContext.Provider>,
);

beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(async (input: RequestInfo | URL) => {
        const file = String(input);
        const product = file.includes('grapes')
            ? fetchedProducts[1]
            : file.includes('orange')
                ? fetchedProducts[2]
                : file.includes('pear')
                    ? fetchedProducts[3]
                    : fetchedProducts[0];
        return { ok: true, json: async () => product } as Response;
    }));
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('ProductsPage', () => {
    it('shows a loading state while products are being fetched', () => {
        renderProducts();

        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('renders fetched products and disables unavailable products', async () => {
        renderProducts();

        expect(await screen.findByText('Our Products')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Grapes')).toBeInTheDocument();
        expect(screen.getByText('Orange')).toBeInTheDocument();
        expect(screen.getAllByText('Crisp apple')).toHaveLength(3);
        expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();
    });

    it('adds an in-stock product to the cart', async () => {
        const user = userEvent.setup();
        renderProducts();

        await screen.findByText('Our Products');
        await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);

        expect(mockCartContext.addToCart).toHaveBeenCalledWith(products[0]);
    });

    it('opens a review modal and submits a new review', async () => {
        const user = userEvent.setup();
        renderProducts();

        await screen.findByText('Our Products');
        await user.click(screen.getByRole('img', { name: 'Apple' }));
        expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();

        await user.type(screen.getByPlaceholderText('Your name'), 'Casey');
        await user.type(screen.getByPlaceholderText('Your review'), 'Great fruit');
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('Casey')).toBeInTheDocument();
        expect(screen.getByText('Great fruit')).toBeInTheDocument();
    });

    it('finishes loading with an empty product list when fetching fails', async () => {
        vi.mocked(fetch).mockRejectedValue(new Error('network failure'));
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        renderProducts();

        await waitFor(() => expect(screen.getByText('Our Products')).toBeInTheDocument());
        expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
        expect(errorSpy).toHaveBeenCalledWith('Error loading products:', expect.any(Error));
    });
});