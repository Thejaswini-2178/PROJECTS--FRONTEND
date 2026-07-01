
const fetchProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed oto fetch products");
        const products = await response.json();
        console.log(products)
        renderProducts(products)
    } catch (error) {
        console.log("Error fetching products:", error.message)
    }
}


// save to local server and get this data from the local server
const saveToLocalServer = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}
const loadFromServer = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// rendering the products now
const renderProducts = (products) => {
    const productList = document.getElementById("product-list")
    productList.innerHTML = '';
    products.forEach((product) => {
        productList.innerHTML += `
                <div class="flex justify-between items-center p-2 border rounded-lg">
                    <span>${product.title}</span>
                    <span>${product.price}</span>
                    <button class="bg-blue-500 text-white px-4 py-1 rounded"
                    onclick="cart.addProduct({id:${product.id}, name:'${product.title}', price:${product.price}})">Add</button>
                </div>
                `
    })
}

// now creating the cart now
const createCart = () => {
    let cart = [];
    let totalPrice = 0;
    return {
        addProduct: (product) => {
            cart.push(product);
            totalPrice += product.price;
            saveToLocalServer(cart)
            renderCart(cart)
        },
        removeProduct: (productId) => {
            cart = cart.filter((p) => p.id !== productId);
            totalPrice = cart.reduce((sum, p) => sum + p.price, 0)
            saveToLocalServer(cart)
            renderCart(cart)
        },
        getCart: () => cart,
        getTotalPrice: () => totalPrice
    }
}

// creating the rendering the cart items
const cart = createCart()
const renderCart = (cart) => {
    const cartItems = document.getElementById("cart-items")
    cartItems.innerHTML = ""
    cart.forEach((item) => {
        cartItems.innerHTML += `
                <div class="flex justify-between items-center p-2 border-b">
                    <span >${item.name}</span>
                    <span style="color:blue">${item.price}</span>
                    <button class="text-red-500" onclick="cart.removeProduct(${item.id})">Remove</button>
                </div>
                `
    })
    document.getElementById("total-price").textContent = `$${cart.reduce((sum, item) => sum + item.price, 0)}`
}

// search button
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// 
const searchProducts = debounce(async (query) => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        const filteredProducts = products.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
        );
        renderProducts(filteredProducts);
    } catch (error) {
        console.error("Error during search:", error);
    }
}, 300);

document.getElementById("search").addEventListener("input", (e) => {
    searchProducts(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
    const storedCart = loadFromServer(); // Corrected function name
    fetchProducts();
    renderCart(storedCart);
});
