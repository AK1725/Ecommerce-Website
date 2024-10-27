const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}
if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

// script.js

// Fetch cart from local storage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to Cart Functionality
function addToCart(productID, name, price, image) {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === productID);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: productID,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    saveCart();
    alert(`${name} has been added to your cart!`);
}

// Function to render the cart items on the cart page
function renderCart() {
    const cartTable = document.querySelector('#cart tbody');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    cartTable.innerHTML = ''; // Clear current cart display

    let subtotal = 0;

    // Iterate through cart and generate table rows
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartTable.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeFromCart(${index})"><i class="fa-solid fa-circle-xmark"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}" /></td>
                <td>${item.name}</td>
                <td>৳${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" /></td>
                <td>৳${itemTotal}</td>
            </tr>
        `;
    });

    // Update subtotal
    subtotalElement.textContent = `৳${subtotal}`;

    // Update total (assuming shipping is free for now)
    totalElement.textContent = `৳${subtotal}`;
}


// Function to update the quantity of a product in the cart
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    cart[index].quantity = parseInt(newQuantity);
    saveCart();
    renderCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at index
    saveCart();
    renderCart();
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }

    // Add event listeners to 'Add to Cart' buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productCard = button.closest('.pro');
            const productID = productCard.dataset.id;
            const productName = productCard.querySelector('h5').innerText;
            const productPrice = parseFloat(productCard.querySelector('h4').innerText.replace('৳', ''));
            const productImage = productCard.querySelector('img').src;

            addToCart(productID, productName, productPrice, productImage);
        });
    });

    const addToCart = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productCard = button.closest('.single-pro-details');
            const productID = productCard.dataset.id;
            const productName = productCard.querySelector('h5').innerText;
            const productPrice = parseFloat(productCard.querySelector('h4').innerText.replace('৳', ''));
            const productImage = productCard.querySelector('img').src;

            addToCart(productID, productName, productPrice, productImage);
        });
    });
});
