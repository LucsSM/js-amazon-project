import {renderCartSummary} from "./chekout/cartSummary.js";
import {renderOrderSummary} from "./chekout/orderSummary.js";
import "../data/cart-class.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
    try {
        // throw 'error1';

        await loadProductsFetch();
        await loadCartFetch();
    } catch(error) {
        console.log('Unexpected error has occured. Try again later.');
    };
    
    renderCartSummary();
    renderOrderSummary();
};

loadPage();


/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve, reject) => {
        // throw 'error2';

        loadCart(() => {
            // reject('error3');
            resolve();
        });
    })
]).then(() => {
    renderCartSummary();
    renderOrderSummary();
});
*/