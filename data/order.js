export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(orderData) {
    orders.unshift(orderData);
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}