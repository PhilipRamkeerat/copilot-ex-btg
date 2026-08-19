import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('helpers', () => {
    describe('formatPrice', () => {
        it('formats a number as US currency', () => {
            expect(formatPrice(29.99)).toBe('$29.99');
        });
    });

    describe('calculateTotal', () => {
        it('calculates the total for multiple quantities', () => {
            expect(calculateTotal([
                { price: 2.5, quantity: 2 },
                { price: 4, quantity: 3 },
            ])).toBe(17);
        });

        it('returns zero for an empty cart', () => {
            expect(calculateTotal([])).toBe(0);
        });
    });

    describe('validateEmail', () => {
        it('accepts a valid email address', () => {
            expect(validateEmail('shopper@example.com')).toBe(true);
        });

        it.each(['shopper', 'shopper@', '@example.com', 'shopper@example'])(
            'rejects an invalid email address: %s',
            email => {
                expect(validateEmail(email)).toBe(false);
            },
        );
    });
});