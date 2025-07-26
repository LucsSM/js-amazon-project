export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function getOrder(orderId) {
        
        let matchingOrder;
            
        orders.forEach((order) => {
            if(order.id === orderId) {
                matchingOrder = order;
            };
        });
        
        return matchingOrder;
}

export function addOrders(orderData) {
    orders.unshift(orderData);
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}