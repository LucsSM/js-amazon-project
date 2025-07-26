import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './utils/money.js';
import {orders} from "../data/orders.js";
import {getProduct, loadProductsFetch} from '../data/products.js';
import {addToCart} from '../data/cart.js';
import {updateCartQuantity} from './amazon.js';

async function renderOrderSummary() {
    await loadProductsFetch();

    let orderHTML = '';

    orders.forEach((orderData) => {
        const orderDate = dayjs(orderData.orderTime).format('MMMM D');
        const orderTotal = formatCurrency(orderData.totalCostCents);

        orderHTML += `
            <div class="order-container">
                
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderDate}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${orderTotal}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${orderData.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${renderProductDetails(orderData)}
                </div>
            </div>
        `;    
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    document.querySelectorAll('.js-buy-again').forEach((button) => {

        let isMessageShownId;

        button.addEventListener('click', () => {
            const productDataset = button.dataset.productId;
            addToCart(productDataset);
            updateCartQuantity();
            button.innerHTML = 'Added';

        if(isMessageShownId) {
            clearTimeout(isMessageShownId);
        };

        const addedMessageId = setTimeout(() => {
            button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            `;
        }, 1000);

        isMessageShownId = addedMessageId;

        });
    });

    console.log('load orders');
};

function renderProductDetails(orders) {
    let productHTML = '';

    orders.products.forEach((orderProduct) => {
        const product = getProduct(orderProduct.productId);
        const estimatedDelivery = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D');

        productHTML += `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${estimatedDelivery}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderProduct.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${orders.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
        `
    });

    return productHTML;
};

updateCartQuantity();
renderOrderSummary();
