    const expenses = {
      food: [],
      transport: [],
      entertainment: []
    };

    const form = document.getElementById("expenseForm");
    const categoriesDiv = document.getElementById("categories");
    const totalExpensesElement = document.getElementById("totalExpenses");

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const category = document.getElementById("category").value;
      const amount = parseFloat(document.getElementById("amount").value);
      const description = document.getElementById("description").value;

      if (amount <= 0) {
        alert("Amount must be greater than 0");
        return;
      }

      expenses[category].push({ amount, description });
      updateCategories();
      form.reset();
    });

    function updateCategories() {
      categoriesDiv.innerHTML = '';
      let totalExpensesAmount = 0;

      for (const [category, expenseList] of Object.entries(expenses)) {
        let categoryTotal = 0;

        expenseList.forEach(exp => {
          categoryTotal += exp.amount;
        });

        totalExpensesAmount += categoryTotal;

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const heading = document.createElement('h3');
        heading.textContent = `${category} - Total: $${categoryTotal.toFixed(2)}`;
        categoryDiv.appendChild(heading);

        const expenseListElement = document.createElement('ul');
        expenseList.forEach(exp => {
          const listItem = document.createElement('li');
          listItem.textContent = `${exp.description}: $${exp.amount.toFixed(2)}`;
          expenseListElement.appendChild(listItem);
        });

        categoryDiv.appendChild(expenseListElement);
        categoriesDiv.appendChild(categoryDiv);
      }

      // Update the total expenses for all categories
      totalExpensesElement.textContent = `Total Expenses: $${totalExpensesAmount.toFixed(2)}`;
    }
