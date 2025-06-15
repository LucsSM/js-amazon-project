import {loadFromStorage} from '../../data/cart.js';
import {renderOrderSummary} from "../../scripts/chekout/orderSummary.js";

describe('TEST SUITE - renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
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

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    it('displays the payment summary', () => {
        expect(document.querySelector('.js-items').innerText).toContain('Items (3):')
        expect(document.querySelector('.js-payment-summary-items').innerText).toContain('$42.75');
        expect(document.querySelector('.js-payment-summary-shipping').innerText).toContain('$4.99');
        expect(document.querySelector('.js-payment-summary-before-tax').innerText).toContain('$47.74');
        expect(document.querySelector('.js-payment-summary-tax').innerText).toContain('$4.77');
        expect(document.querySelector('.js-payment-summary-total').innerText).toContain('$52.51');
    });
});