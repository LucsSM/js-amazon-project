import {renderCartSummary} from "./chekout/cartSummary.js";
import {renderOrderSummary} from "./chekout/orderSummary.js";
import "../data/cart-class.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

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