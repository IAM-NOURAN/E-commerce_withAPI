

function updateQuantity(quantityId, change) {
    const quantityElement = document.getElementById(quantityId);
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    quantityElement.textContent = currentQuantity;

    // Update total price for the product
    const priceElement = document.getElementById(quantityId.replace('quantity', 'price'));
    const totalElement = document.getElementById(quantityId.replace('quantity', 'total'));
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    totalElement.textContent = `$${(price * currentQuantity).toFixed(2)}`;
}

function calculateCartTotal() {
    const totalElements = document.querySelectorAll('[id^="product"][id$="_total"]');
    const shippingCost = 30.00; // Example shipping cost
    let cartTotal = 0;
    totalElements.forEach(totalElement => {
        cartTotal += parseFloat(totalElement.textContent.replace('$', ''));
    });
    cartTotal += shippingCost;
    document.querySelector('.total_amount').textContent = `Total: $${cartTotal.toFixed(2)}`;
    document.getElementById('subtotal_span').textContent = ` $${cartTotal.toFixed(2)}`;
}