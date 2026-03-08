

/****** past code for cart page, now replaced with a more dynamic version *******/

/*function updateQuantity(quantityId, change) {
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
}*/

/////////////////////////////////////////////////////////////////////////

/**** past code for loading a single product into the cart ******/

/*
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('id');
console.log(productId);

// Only run the request if a productId is actually in the URL
if (productId) {
    let xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
        if (this.status == 200) {
            // FIX 1: Parse the single product object directly (no need to use .find!)
            let product = JSON.parse(this.responseText); 
            
            let tbody = document.querySelector("tbody");
            
            // FIX 2: Use dynamic IDs instead of 'product1' so it scales better
            let raws = `
                <tr>
                    <td>
                        <div class="product-info">
                            <img src="${product.photo1}" alt="Product Image">
                            <span>${product.name}</span>
                        </div>
                    </td>
                    <td id="product_${product.id}_price">$${Number(product.price).toFixed(2)}</td>
                    <td>
                        <button class="increase_quantity" onclick="updateQuantity('product_${product.id}_quantity', 1)">+</button>
                        <span id="product_${product.id}_quantity">1</span>
                        <button class="decrease_quantity" onclick="updateQuantity('product_${product.id}_quantity', -1)">-</button>
                    </td>
                    <td id="product_${product.id}_total">$${(Number(product.price) * 1).toFixed(2)}</td>
                </tr>
            `;
            tbody.innerHTML += raws;
        } else {
            console.error("Error fetching product. Status:", this.status);
        }
    }

    xhr.open("GET", "https://69ab3a51e051e9456fa39c75.mockapi.io/api/clothes/products/" + productId, true);
    xhr.send();
} else {
    console.log("No product ID found in the URL. Cart is empty.");
}*/

///////////////////////////////////////////////////////////////////////////////

////////////to update the quantity of a product in the cart/////////////

updateQuantity = function(productId, change) {
    let product = cart.find(p => p.id == productId);
    if (!product) return; // If we can't find the product, do nothing

    product.quantity += change;
    if (product.quantity <= 0) {
        cart = cart.filter(p => p.id != productId);
    }

    localStorage.setItem('myShoppingItems', JSON.stringify(cart));
    renderCart();
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

let quantityButtons = document.querySelectorAll('.quantity-btn');
quantityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const [action, id] = button.id.split('_');
        const quantityId = `quantity_${id}`;
        updateQuantity(quantityId, action === 'inc' ? 1 : -1);
        calculateCartTotal();
    });
});

// Initial total calculation
calculateCartTotal();

/////////////////////////////////////////////////////////////////////////////
           //////////******* api from home *******/////////////

// 1. Get the existing cart from localStorage, or create an empty array if it's empty

let cart = JSON.parse(localStorage.getItem('myShoppingItems')) || [];
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('id');

// 2. Create a function to draw the entire cart on the screen
function renderCart() {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Clear out the table before drawing so we don't get duplicates
    
    // Loop through every item saved in our cart and create a row for it
    cart.forEach(product => {
        let row = `
            <tr>
                <td>
                    <div class="product-info">
                        <img src="${product.photo1}" alt="Product Image" style="width: 50px;">
                        <span>${product.name}</span>
                    </div>
                </td>
                <td id="product_${product.id}_price">$${Number(product.price).toFixed(2)}</td>
                <td>
                    <button class="increase_quantity" onclick="updateQuantity('${product.id}', 1)">+</button>
                    <span id="product_${product.id}_quantity">${product.quantity}</span>
                    <button class="decrease_quantity" onclick="updateQuantity('${product.id}', -1)">-</button>
                </td>
                <td id="product_${product.id}_total">$${(Number(product.price) * product.quantity).toFixed(2)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
         
    });
}

// 3. If there is a new product ID in the URL, fetch it
if (productId) {
    // Using the 'fetch' API instead of XMLHttpRequest
    fetch("https://69ab3a51e051e9456fa39c75.mockapi.io/api/clothes/products/" + productId)
        .then(response => response.json())
        .then(newProduct => {
            
            // Check if this product is already inside our cart array
            let existingProduct = cart.find(p => p.id == productId);
            
            if (existingProduct) {
                // If it's already in the cart, just add 1 to the quantity
                existingProduct.quantity += 1; 
            } else {
                // If it's brand new, set its quantity to 1 and push it into the array
                newProduct.quantity = 1; 
                cart.push(newProduct); 
            }
            
            // 4. Save the newly updated array back to your browser's localStorage
            localStorage.setItem('myShoppingItems', JSON.stringify(cart));
            
            // Pro-Tip: Clean the URL so if the user hits "refresh", it doesn't add the item a second time!
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // 5. Draw the updated cart
            renderCart();
        })
        .catch(error => console.error("Error fetching product:", error));
} else {
    // If there is no ID in the URL (they just opened the cart page normally), just draw what's saved
    renderCart();
}

