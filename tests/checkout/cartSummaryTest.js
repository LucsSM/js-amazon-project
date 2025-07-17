import {renderCartSummary} from '../../scripts/chekout/cartSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import {formatCurrency} from '../../scripts/utils/money.js';
import {loadProducts} from '../../data/products.js';

describe('TEST SUITE - renderCartSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-checkout-total"></div>
            <div class="js-cart-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        renderCartSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText
        ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText
        ).toContain(`$${formatCurrency(1090)}`);

        expect(
            document.querySelector(`.js-product-name-${productId2}`).innerText
        ).toContain('Intermediate Size Basketball');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText
        ).toContain(`$${formatCurrency(2095)}`);
    });

    it('updates the delivery option', () => {
        const deliveryOption = document.querySelector(`.js-delivery-option-${productId1}-3`);
        deliveryOption.click();
        const deliveryInput = document.querySelector(`.js-delivery-option-input-${productId1}-3`);
        const shippingPrice = document.querySelector('.js-payment-summary-shipping');
        const totalPrice = document.querySelector('.js-payment-summary-total');

        expect(deliveryInput.checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(shippingPrice.innerText).toEqual('$14.98');
        expect(totalPrice.innerText).toEqual('$63.50');
    });

    it('removes a product', ()=> {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        const shippingPrice = document.querySelector('.js-payment-summary-shipping');
        const totalPrice = document.querySelector('.js-payment-summary-total');

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        expect(totalPrice.innerText).toEqual('$28.53');
        expect(shippingPrice.innerText).toEqual('$4.99');
    });
});