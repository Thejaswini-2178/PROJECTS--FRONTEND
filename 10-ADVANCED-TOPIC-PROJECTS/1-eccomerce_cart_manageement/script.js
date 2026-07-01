const products = [
  {
    id: 1,
    name: "Aurora Headphones",
    price: 129,
    icon: "🎧",
    badge: "Best Seller",
    description: "Immersive sound with active noise cancellation.",
  },
  {
    id: 2,
    name: "Nova Smart Watch",
    price: 189,
    icon: "⌚",
    badge: "New",
    description: "Track health, steps, and your day with style.",
  },
  {
    id: 3,
    name: "Luma Laptop Stand",
    price: 49,
    icon: "💻",
    badge: "Hot Deal",
    description: "Ergonomic comfort for long study and work sessions.",
  },
  {
    id: 4,
    name: "Glow Desk Lamp",
    price: 79,
    icon: "💡",
    badge: "Editor Pick",
    description: "Adjustable lighting for late-night focus and reading.",
  },
];

const storageKey = "smartcart-demo";
const state = {
  cart: JSON.parse(localStorage.getItem(storageKey) || "[]"),
  searchTerm: "",
};

const elements = {
  products: document.getElementById("products"),
  cartItems: document.getElementById("cart-items"),
  cartCount: document.getElementById("cart-count"),
  subtotal: document.getElementById("subtotal"),
  total: document.getElementById("total"),
  clearCart: document.getElementById("clear-cart"),
  checkout: document.getElementById("checkout"),
  searchInput: document.getElementById("product-search"),
  suggestions: document.getElementById("product-suggestions"),
};

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(state.cart));
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  saveCart();
  render();
}

function updateQuantity(productId, change) {
  state.cart = state.cart
    .map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + change };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  saveCart();
  render();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  render();
}

function renderSuggestions() {
  const searchValue = state.searchTerm.trim().toLowerCase();

  if (!searchValue) {
    elements.suggestions.innerHTML = products
      .slice(0, 5)
      .map((product) => `<option value="${product.name}"></option>`)
      .join("");
    return;
  }

  const suggestions = products.filter((product) => {
    return [product.name, product.description, product.badge]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  elements.suggestions.innerHTML = suggestions
    .slice(0, 6)
    .map((product) => `<option value="${product.name}"></option>`)
    .join("");
}

function renderProducts() {
  const filteredProducts = products.filter((product) => {
    const searchValue = state.searchTerm.trim().toLowerCase();
    if (!searchValue) return true;

    return [product.name, product.description, product.badge]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  if (!filteredProducts.length) {
    elements.products.innerHTML = `
      <div class="no-results">
        <h4>No products found</h4>
        <p>Try a different keyword.</p>
      </div>
    `;
    return;
  }

  elements.products.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-icon">${product.icon}</div>
          <span class="badge">${product.badge}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <strong>${formatCurrency(product.price)}</strong>
            <button class="add-btn" type="button" data-action="add" data-id="${product.id}">
              Add to cart
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  if (!state.cart.length) {
    elements.cartItems.innerHTML = `
      <div class="empty-state">
        <h4>Your cart is empty</h4>
        <p>Add some products to get started.</p>
      </div>
    `;
    return;
  }

  elements.cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-top">
            <div>
              <h4>${item.name}</h4>
              <p>${formatCurrency(item.price)} each</p>
            </div>
            <strong>${formatCurrency(item.price * item.quantity)}</strong>
          </div>
          <div class="cart-controls">
            <div class="qty-controls">
              <button class="qty-btn" type="button" data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" type="button" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderSummary() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  elements.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.subtotal.textContent = formatCurrency(subtotal);
  elements.total.textContent = formatCurrency(total);
}

function render() {
  renderSuggestions();
  renderProducts();
  renderCart();
  renderSummary();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const productId = Number(button.dataset.id);

  if (action === "add") {
    addToCart(productId);
  } else if (action === "increase") {
    updateQuantity(productId, 1);
  } else if (action === "decrease") {
    updateQuantity(productId, -1);
  } else if (action === "remove") {
    removeFromCart(productId);
  }
});

elements.searchInput.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  renderSuggestions();
  renderProducts();
});

elements.clearCart.addEventListener("click", () => {
  state.cart = [];
  saveCart();
  render();
});

elements.checkout.addEventListener("click", () => {
  if (!state.cart.length) {
    alert("Add items to your cart before checking out.");
    return;
  }

  alert("Checkout is ready! Connect this demo to a real payment flow next.");
});

render();
