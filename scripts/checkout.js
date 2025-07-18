import {renderCartSummary} from "./chekout/cartSummary.js";
import {renderOrderSummary} from "./chekout/orderSummary.js";
import "../data/cart-class.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
    await loadProductsFetch();
    
    await loadCartFetch();

    renderCartSummary();
    renderOrderSummary();
};

loadPage();


/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderCartSummary();
    renderOrderSummary();
});
*/