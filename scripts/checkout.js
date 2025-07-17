import {renderCartSummary} from "./chekout/cartSummary.js";
import {renderOrderSummary} from "./chekout/orderSummary.js";
import "../data/cart-class.js";
import {loadProducts} from "../data/products.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

loadProducts(() =>{
    renderCartSummary();
    renderOrderSummary();
})