import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {cart,
    deleteProduct,
    updateProductQuantity,
    updateDeliveryOption
} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js";
import {renderCheckoutHeader} from "./checkoutHeader.js";

export function renderCartSummary() {

    let cartProductHTML = '';
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        
        const deliveryDateFormat = calculateDeliveryDate(deliveryOption);
        
        cartProductHTML +=`
        <div class="cart-item-container js-cart-item-container js-cart-item-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${deliveryDateFormat}</div>
        
        <div class="cart-item-details-grid">
        <img class="product-image"src="${matchingProduct.image}">
        
        <div class="cart-item-details">
        <div class="product-name js-product-name-${matchingProduct.id}">
        ${matchingProduct.name}
        </div>
        <div class="product-price js-product-price-${matchingProduct.id}">
        $${matchingProduct.getPriceUrl()}
        </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
        <span>
        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-product" data-product-id="${matchingProduct.id}">
        Update
        </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
        <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
        <span class="delete-quantity-link link-primary js-delete-product js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
        Delete
        </span>
        </div>
        </div>
        
        <div class="delivery-options">
        <div class="delivery-options-title">
        Choose a delivery option:
        </div>
        ${generateDeliveryOptions(matchingProduct, cartItem)}
        </div>
        </div>
        </div>
        `;
    });

    const cartContainertHTML = document.querySelector('.js-cart-summary');
    cartContainertHTML.innerHTML = cartProductHTML;
    renderCheckoutHeader();

    // delete a product from cart
    document.querySelectorAll('.js-delete-product').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            deleteProduct(productId);
            renderCheckoutHeader();
            renderCartSummary();
            renderPaymentSummary();

        });
    });

    // allows to change the quantity of a product
    document.querySelectorAll('.js-update-product').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const itemContainer = document.querySelector(`.js-cart-item-${productId}`);
            itemContainer.classList.add('is-editing-quantity');
        });
    });

    // change the quantity of a product
    document.querySelectorAll('.save-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            
            const cartProduct = document.querySelector(`.js-cart-item-${productId}`);
            cartProduct.classList.remove('is-editing-quantity');
            
            const updateInput = document.querySelector(`.js-quantity-input-${productId}`);
            const productNewQuantity = Number(updateInput.value);
            
            if (productNewQuantity === 0) {
                if(confirm('0 quantity was inputted. Are you sure you want to delete the product from your cart?')) {
                    deleteProduct(productId);
                    renderCartSummary();
                    renderCheckoutHeader();
                    renderPaymentSummary();    
                }
            } else if(productNewQuantity < 0 || productNewQuantity > 100) {
                alert('quantity has do be from 0 to 100')
            } else {
                updateProductQuantity(productId, productNewQuantity);
                renderCartSummary();
                renderCheckoutHeader();
                renderPaymentSummary();
            };
        });
    });

    // changes the delivery opdtion of a product
    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const {productId, deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCartSummary();
            renderPaymentSummary();
        });
    });

    function generateDeliveryOptions(matchingProduct, cartItem) {
        let html = '';
        
        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDateFormat = calculateDeliveryDate(deliveryOption);
            const deliveryPriceCents = deliveryOption.priceCents === 0
            ? 'FREE' 
            : `${formatCurrency(deliveryOption.priceCents)} - `;
            
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            
            html += `
            <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
            data-product-id="${matchingProduct.id}" 
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
            ${deliveryDateFormat}
            </div>
            <div class="delivery-option-price">
            ${deliveryPriceCents} Shipping
            </div>
            </div>
            </div>
            `;
        });
        
        return html;
    }
}