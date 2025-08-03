import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

export function renderProductsGrid() {
    let productsHTML = '';

    const url = new URL(window.location.href);
    let search = url.searchParams.get('search');
    
    let filteredProducts = products;

    // check the search bar and renders the products that fit the search
    if(search) {  
        search = search.toLowerCase();
        
        filteredProducts = products.filter((product) => {
            let productName = product.name.toLowerCase(); 
            let matchingkeyword = false;

            product.keywords.forEach((keyword) => {
                if(keyword.toLowerCase() === search) {
                    matchingkeyword = true;
                }
            })
            return productName.includes(search) || matchingkeyword;
        })
        
    };

    filteredProducts.forEach((product) => {
        productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPriceUrl()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-message-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart js-added-message"
            data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
        `;
    });
    
    document.querySelector('.js-products-grid').innerHTML = productsHTML;
    updateCartQuantity();

    // adds the product to the cart
    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
    // Create and id to use in closure
        let isMessageShownId;
        
        button.addEventListener('click', () => {
        const { productId } = button.dataset;
        const productSelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(productSelector.value);
        const addedMessage = document.querySelector(`.js-added-message-${productId}`);
        addedMessage.classList.add('show-added-message');
        console.log('clicked');

        // check if the closure variable has the timeout id in it
        if(isMessageShownId) {
            clearTimeout(isMessageShownId);
        };

        // run the timeout in a variable 
        const showMessageId = setTimeout(() => addedMessage.classList.remove('show-added-message'), 2000);;

        // save the timeout in the closure variable. The next time the button is pressed, it will contain the timeout and clear it in the if clause check. 
        isMessageShownId = showMessageId;

        addToCart(productId, quantity);
        updateCartQuantity();
        });
    });
};

// search feature
document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${searchValue}`;
})

// allows Enter key to be used in the search bar
document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const searchValue = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchValue}`;
    }
})

export function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    if (cartQuantity === 0) {
        cartQuantity = '';    
    } else {
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    }
};
