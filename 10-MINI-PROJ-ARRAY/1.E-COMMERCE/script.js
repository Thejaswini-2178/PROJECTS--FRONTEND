const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 },
];

let cart = [];

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!cart.some(item => item.id === productId)) {
        cart.push(product);
        displayCart();
    } else {
        alert('Product already in cart!');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
        cartItemsDiv.appendChild(div);
    });

    calculateTotal();
}

function calculateTotal() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalPrice').textContent = totalPrice;
}

function searchItemInCart() {
    const searchInput = document.getElementById('searchInput').value;
    const productId = parseInt(searchInput, 10);
    if (isNaN(productId)) {
        alert('Please enter a valid Product ID!');
        return;
    }
    const product = cart.find(item => item.id === productId);
    if (product) {
        alert(`Product Found:\nName: ${product.name}\nPrice: $${product.price}`);
    } else {
        alert('Product not found in cart!');
    }
}
