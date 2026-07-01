const expenseTracker = {

    expenses: {},
    // Add an expense under a category
    addExpense(category, amount) {
        if (amount <= 0) {
            alert("Expense amount must be greater than zero!");
            return;
        }

        if (!this.expenses[category]) {
            this.expenses[category] = [];
        }

        this.expenses[category].push({
            id: Date.now(),
            amount: parseFloat(amount),
            date: new Date(),
        });

        this.renderCategories();
    },

    // Get total expenses for a category
    getTotalExpenses(category) {
        return this.expenses[category].reduce((total, expense) => total + expense.amount, 0);
    },

    // Render all categories and their expenses
    renderCategories() {
        const container = document.getElementById("categoriesContainer");
        container.innerHTML = ""; // Clear existing categories

        Object.keys(this.expenses).forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "bg-white p-4 rounded shadow";

            // Category Header
            //innerHTML, you can insert HTML tags and structure into the element dynamically.
            categoryDiv.innerHTML = `
          <h2 class="text-lg font-semibold mb-4">${category} - Total: $${this.getTotalExpenses(
                category
            ).toFixed(2)}</h2>
          <ul class="space-y-2">
            ${this.expenses[category]
                    .map(
                        expense => `
                <li class="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <span>$${expense.amount.toFixed(2)} - ${new Date(
                            expense.date
                        ).toLocaleDateString()}</span>
                  <button  onclick="expenseTracker.removeExpense('${category}', ${expense.id})">Remove</button>
                </li>
              `
                    )
                    .join("")}
          </ul>
        `;

            container.appendChild(categoryDiv);
        });
    },

    // Remove an expense by ID
    removeExpense(category, expenseId) {
        this.expenses[category] = this.expenses[category].filter(expense => expense.id !== expenseId);

        if (this.expenses[category].length === 0) {
            delete this.expenses[category];
        }

        this.renderCategories();
    },
};

// Handle the Add Expense form submission
document.getElementById("addExpenseForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("category").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    expenseTracker.addExpense(category, amount);
    e.target.reset();
});
