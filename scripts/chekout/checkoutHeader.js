import {calculateCartQuantity} from "../../data/cart.js"

export function renderCheckoutHeader () {
    let cartQuantity = calculateCartQuantity();
    const checkoutTotal = document.querySelector('.js-checkout-total');
            
    if (cartQuantity === 0) {
        checkoutTotal.innerHTML = '';
    } else {
        checkoutTotal.innerHTML = cartQuantity;
    };
}