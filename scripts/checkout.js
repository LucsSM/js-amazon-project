import {cart,
    deleteProduct,
    calculateCartQuantity,
    updateProductQuantity
}from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

let cartProductHTML = '';
const checkoutTotal = document.querySelector('.js-checkout-total');

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    })

    cartProductHTML +=
    `
        <div class="cart-item-container cart-item-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
            <img class="product-image"src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-product" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-product" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    `;

    const cartContainertHTML = document.querySelector('.js-cart-container');
    cartContainertHTML.innerHTML = cartProductHTML;

    updateCartQuantity();
    
    document.querySelectorAll('.js-delete-product').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            deleteProduct(productId);
            
            const cartProduct = document.querySelector(`.cart-item-${productId}`);
            cartProduct.remove();
            updateCartQuantity();
        });
    });

    document.querySelectorAll('.js-update-product').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const itemContainer = document.querySelector(`.cart-item-${productId}`);
            itemContainer.classList.add('is-editing-quantity');  
        });
    });
    
    document.querySelectorAll('.save-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            
            const cartProduct = document.querySelector(`.cart-item-${productId}`);
            cartProduct.classList.remove('is-editing-quantity');
            
            const updateInput = document.querySelector(`.js-quantity-input-${productId}`);
            const productNewQuantity = Number(updateInput.value);

            if (productNewQuantity === 0) {
                if(confirm('0 quantity was inputted. Are you sure you want to delete the product from your cart?')) {
                    deleteProduct(productId);
                    cartProduct.remove();
                    updateCartQuantity();    
                }
            } else if(productNewQuantity < 0 || productNewQuantity > 100) {
                alert('quantity has do be from 0 to 100')
            } else {
                updateProductQuantity(productId, productNewQuantity);
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = productNewQuantity;
                updateCartQuantity();
            };
        });
    });
});

function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    if (cartQuantity === 0) {
        checkoutTotal.innerHTML = '';
    } else {
        checkoutTotal.innerHTML = cartQuantity;
    };
};