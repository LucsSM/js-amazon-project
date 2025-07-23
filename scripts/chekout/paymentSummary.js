import {cart} from "../../data/cart.js"
import {getProduct} from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";
import {addOrders} from "../../data/orders.js";

export function renderPaymentSummary() {
    let cartTotal = 0;
    let itemsPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId)
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        
        cartTotal += cartItem.quantity;
        itemsPriceCents += product.priceCents * cartItem.quantity;
        shippingPriceCents += deliveryOption.priceCents;
        
    });

    const totalBeforeTax = itemsPriceCents + shippingPriceCents;
    const estimatedTax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + estimatedTax;
    
    const html = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
            <div class="js-items">Items (${cartTotal}):</div>
            <div class="payment-summary-money js-payment-summary-items">$${formatCurrency(itemsPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-payment-summary-before-tax">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-payment-summary-tax">$${formatCurrency(estimatedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(orderTotal)}</div>
        </div>

        <button class="place-order-button js-place-order-button button-primary">
            Place your order
        </button>
    `;

    const paymentSummaryHTML = document.querySelector('.js-payment-summary');
    paymentSummaryHTML.innerHTML = html;
    
    document.querySelector('.js-place-order-button').addEventListener('click', async () => {
        try {const response = await fetch('https://supersimplebackend.dev/orders',
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart
                    })
                }
            );

            const order = await response.json();
            addOrders(order);

            window.location.href = 'orders.html';

        } catch (error) {
            console.log('Unexpected error has occured. Try again later.');
        };
    
    });
}
