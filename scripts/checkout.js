import {renderCartSummary} from "./chekout/cartSummary.js";
import {renderOrderSummary} from "./chekout/orderSummary.js";
import "../data/cart-class.js";
import {loadProducts} from "../data/products.js";
import {loadCart} from "../data/cart.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderCartSummary();
    renderOrderSummary();
});