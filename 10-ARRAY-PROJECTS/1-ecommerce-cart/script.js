const cart = {
    items: [],

    addProduct(product) {
        const exists = this.items.find((item) => item.id === product.id);
        if (!exists) this.items.push(product);
    },

    removeProduct(productId) {
        this.items = this.items.filter((item) => item.id !== productId);
    },

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    },

    renderCart() {
        const cartItems = document.getElementById("cartItems");
        cartItems.innerHTML = ""; // Clear previous cart items

        this.items.forEach((item) => {
            const li = document.createElement("li");
            li.className = "flex justify-between items-center bg-gray-100 p-4 rounded-md";
            li.innerHTML = `
      <span>${item.name}</span>
      <div>
        <span class="mr-4">$${item.price}</span>
        <button class="text-red-500 hover:underline" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
            cartItems.appendChild(li);
        });

        document.getElementById("totalPrice").textContent = this.calculateTotal();
    },
};

function addProduct(e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = parseFloat(
        document.getElementById("productPrice").value
    );
    const productId = Date.now(); // Unique ID based on timestamp

    const newProduct = { id: productId, name: productName, price: productPrice };
    cart.addProduct(newProduct);

    cart.renderCart();
    e.target.reset(); // Reset form
}

function removeFromCart(productId) {
    cart.removeProduct(productId);
    cart.renderCart();
}

// Attach event listeners
document.getElementById("addProductForm").addEventListener("submit", addProduct);
