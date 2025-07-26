export function formatCurrency(productPrice) {
    return (Math.round(productPrice) / 100).toFixed(2);
}

export default formatCurrency;