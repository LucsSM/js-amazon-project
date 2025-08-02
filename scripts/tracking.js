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

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productOrderDetails.estimatedDeliveryTime);
    const deliveryProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    console.log(deliveryProgress);

    const deliveryStatus = today < deliveryTime ? 'Arriving on' : 'Delivered on';

    const trackingHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                ${deliveryStatus} ${deliveryTime.format('dddd, MMMM D')}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${productOrderDetails.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
                <div class="preparing-label">
                    Preparing
                </div>
                <div class="shipped-label">
                    Shipped
                </div>
                <div class="delivered-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width:${deliveryProgress}%"></div>
            </div>
        </div>
    `

    document.querySelector('.js-main').innerHTML = trackingHTML;
    highlightStatus(deliveryProgress);

    console.log('load tracking')
}

function highlightStatus(deliveryProgress) {

    if(deliveryProgress < 50) {
        document.querySelector('.preparing-label').classList.add('current-status');
    }

    if(deliveryProgress > 50 && deliveryProgress < 100) {
        document.querySelector('.shipped-label').classList.add('current-status');
    }

    if(deliveryProgress >= 100) {
        document.querySelector('.delivered-label').classList.add('current-status');
    }
}

updateCartQuantity();
renderTracking();