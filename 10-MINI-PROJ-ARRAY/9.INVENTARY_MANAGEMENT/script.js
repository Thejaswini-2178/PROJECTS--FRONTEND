const inventorySystem = {
    products: [],
    // Add a new product
    addProduct(name, quantity) {
        const productId = Date.now(); // Unique ID based on timestamp
        const newProduct = {
            id: productId,
            name,
            quantity: parseInt(quantity),
        };

        this.products.push(newProduct);
        this.renderProducts();
        this.resetForm();
    },

    // Update product quantity
    updateProductQuantity(id, newQuantity) {
        const productIndex = this.products.findIndex(
            (product) => product.id === id
        );
        if (productIndex !== -1) {
            this.products[productIndex].quantity = newQuantity;
            this.renderProducts();
        } else {
            alert("Product not found!");
        }
    },

    // Remove a product
    removeProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        this.renderProducts();
    },

    // Calculate total quantity
    calculateTotalQuantity() {
        return this.products.reduce(
            (total, product) => total + product.quantity,
            0
        );
    },

    // Sort products by name
    sortProductsByName() {
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        this.renderProducts();
    },

    // Render product list
    renderProducts() {
        const productList = document.getElementById("productList");
        const totalQuantity = document.getElementById("totalQuantity");

        productList.innerHTML = ""; // Clear existing list
        this.products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.className = "bg-white p-4 rounded shadow";

            productDiv.innerHTML = `
          <p class="font-semibold">${product.name} (Quantity: ${product.quantity})</p>
          <div class="mt-4">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onclick="inventorySystem.promptUpdateQuantity(${product.id})"
            >
              Update Quantity
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onclick="inventorySystem.removeProduct(${product.id})"
            >
              Remove
            </button>
          </div>
        `;

            productList.appendChild(productDiv);
        });

        // Update total quantity
        totalQuantity.textContent = this.calculateTotalQuantity();
    },

    // Prompt to update product quantity
    promptUpdateQuantity(id) {
        const newQuantity = prompt("Enter new quantity:");
        if (newQuantity && !isNaN(newQuantity) && parseInt(newQuantity, 10) >= 0) {
            this.updateProductQuantity(id, parseInt(newQuantity, 10));
        } else {
            alert("Invalid quantity!");
        }
    },

    // Reset the form
    resetForm() {
        document.getElementById("productName").value = "";
        document.getElementById("productQuantity").value = "";
    },
};

// Handle Add Product form submission
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const quantity = document.getElementById("productQuantity").value.trim();

    if (name && quantity && parseInt(quantity, 10) > 0) {
        inventorySystem.addProduct(name, quantity);
    } else {
        alert("Please enter valid product details!");
    }
});

