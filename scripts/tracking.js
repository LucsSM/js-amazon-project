import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {getOrder} from "../data/orders.js";
import {getProduct, loadProductsFetch} from "../data/products.js";
import {updateCartQuantity} from './amazon.js';

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

async function renderTracking() {
    await loadProductsFetch();

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let productOrderDetails;
    order.products.forEach((details) => {
        if(product.id === details.productId) {
            productOrderDetails = details;
        }
    });

    const trackingHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${dayjs(productOrderDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${productOrderDetails.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    `

    document.querySelector('.js-main').innerHTML = trackingHTML;

    console.log('load tracking')
}

updateCartQuantity();
renderTracking();