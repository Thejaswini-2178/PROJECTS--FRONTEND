        // const cart = {
        //   items: {},
        //   addProduct(name, price) {
        //     const id = Object.keys(this.items).length + 1; // Generate unique ID
        //     this.items[id] = { name, price };
        //     this.updateCart();
        //   },
        var cart = {
            items: {},
            currentId: 1, // Initialize a counter

            addProduct: function (name, price) {
                var id = this.currentId++; // Use the counter as the unique ID and increment it
                this.items[id] = { name: name, price: price };
                this.updateCart();
            },
        removeProduct(id) {
            delete this.items[id];
            this.updateCart();
        },
        calculateTotal() {
            return Object.values(this.items).reduce((total, item) => total + item.price, 0).toFixed(2);
        },
        updateCart() {
            const cartItemsDiv = document.getElementById('cartItems');
            const totalPriceSpan = document.getElementById('totalPrice');
            cartItemsDiv.innerHTML = '';

            Object.entries(this.items).forEach(([id, item]) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
            <h4>${item.name} - $${item.price.toFixed(2)}</h4>
            <button class="remove-btn" onclick="cart.removeProduct(${id})">Remove</button>
          `;
                cartItemsDiv.appendChild(itemDiv);
            });

            totalPriceSpan.textContent = this.calculateTotal();
        }
    };

        document.getElementById('addProduct').addEventListener('click', () => {
            const name = document.getElementById('productName').value;
            const price = parseFloat(document.getElementById('productPrice').value);

            if (!name || price <= 0) {
                alert('Please enter a valid product name and price!');
                return;
            }

            cart.addProduct(name, price);
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
        });
