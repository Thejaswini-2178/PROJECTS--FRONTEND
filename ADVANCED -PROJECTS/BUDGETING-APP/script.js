    // BudgetingApp class implementation
    class BudgetingApp {
      constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.categories = ['Housing', 'Food', 'Transportation', 'Utilities', 'Clothing', 'Healthcare', 'Entertainment', 'Education', 'Personal', 'Other'];
        this.nextId = Math.max(0, ...this.transactions.map(t => t.id)) + 1;
      }
      
      addTransaction(amount, type, category, date, description = '') {
        if (amount <= 0) {
          throw new Error('Amount must be positive');
        }
        
        const transaction = {
          id: this.nextId++,
          amount: type === 'income' ? amount : -amount,
          type,
          category,
          date: new Date(date),
          description
        };
        
        this.transactions.push(transaction);
        this._saveTransactions();
        return transaction;
      }
      
      getCurrentBalance() {
        return this.transactions.reduce((total, t) => total + t.amount, 0);
      }
      
      generateMonthlyReport(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        
        const monthTransactions = this.transactions.filter(t => 
          t.date >= startDate && t.date <= endDate
        );
        
        const income = monthTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const expenses = monthTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
          
        const savings = income - expenses;
        
        return {
          year,
          month,
          income,
          expenses,
          savings,
          transactions: monthTransactions.sort((a, b) => b.date - a.date)
        };
      }
      
      getSpendingPieData(year, month) {
        const report = this.generateMonthlyReport(year, month);
        const categoryMap = {};
        
        report.transactions
          .filter(t => t.type === 'expense')
          .forEach(t => {
            if (!categoryMap[t.category]) {
              categoryMap[t.category] = 0;
            }
            categoryMap[t.category] += Math.abs(t.amount);
          });
          
        return Object.entries(categoryMap).map(([category, amount]) => ({
          category,
          amount
        }));
      }
      
      getTrendData(monthsCount) {
        const result = [];
        const today = new Date();
        
        for (let i = monthsCount - 1; i >= 0; i--) {
          const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const report = this.generateMonthlyReport(year, month);
          
          result.push({
            year,
            month,
            income: report.income,
            expenses: report.expenses,
            savings: report.savings
          });
        }
        
        return result;
      }
      
      _saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      }
    }

    // Initialize the budgeting app
    const budgetApp = new BudgetingApp();
    
    // DOM elements
    const transactionForm = document.getElementById('transactionForm');
    const typeSelect = document.getElementById('type');
    const categorySelect = document.getElementById('category');
    const categoryGroup = document.getElementById('categoryGroup');
    const balanceDisplay = document.getElementById('balance');
    const reportMonth = document.getElementById('reportMonth');
    const generateReportBtn = document.getElementById('generateReport');
    const summaryDiv = document.getElementById('summary');
    const transactionsTable = document.getElementById('transactionsTable').querySelector('tbody');
    
    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();
    
    // Set default report month to current month
    const today = new Date();
    reportMonth.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    // Update category options based on transaction type
    function updateCategoryOptions() {
      categorySelect.innerHTML = '';
      
      if (typeSelect.value === 'income') {
        const option = document.createElement('option');
        option.value = 'Income';
        option.textContent = 'Income';
        categorySelect.appendChild(option);
      } else {
        budgetApp.categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });
      }
    }
    
    // Update balance display
    function updateBalance() {
      const balance = budgetApp.getCurrentBalance();
      balanceDisplay.textContent = `$${balance.toFixed(2)}`;
      
      // Change color based on balance
      if (balance < 0) {
        balanceDisplay.style.color = '#f72585';
      } else {
        balanceDisplay.style.color = '#4361ee';
      }
    }
    
    // Generate and display report
    function generateReport() {
      const [year, month] = reportMonth.value.split('-').map(Number);
      const report = budgetApp.generateMonthlyReport(year, month);
      
      // Update summary
      summaryDiv.innerHTML = `
        <p>Income: $${report.income.toFixed(2)}</p>
        <p>Expenses: $${report.expenses.toFixed(2)}</p>
        <p>Savings: $${report.savings.toFixed(2)}</p>
      `;
      
      // Update transactions table
      transactionsTable.innerHTML = '';
      report.transactions.slice(0, 10).forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${t.date.toLocaleDateString()}</td>
          <td>${t.description || '-'}</td>
          <td class="${t.type}">${t.type === 'income' ? '+' : '-'}$${Math.abs(t.amount).toFixed(2)}</td>
          <td>${t.category}</td>
        `;
        transactionsTable.appendChild(row);
      });
      
      // Update pie chart
      updatePieChart(report);
      
      // Update trend chart
      updateTrendChart();
    }
    
    // Pie chart instance
    let pieChart;
    function updatePieChart(report) {
      const pieData = budgetApp.getSpendingPieData(report.year, report.month);
      
      const ctx = document.getElementById('pieChart').getContext('2d');
      
      if (pieChart) {
        pieChart.destroy();
      }
      
      pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieData.map(item => item.category),
          datasets: [{
            data: pieData.map(item => item.amount),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
              '#9966FF', '#FF9F40', '#8AC24A', '#EA5F89',
              '#5F6E7A', '#5A9E89'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = (value / report.expenses) * 100;
                  return `${label}: $${value.toFixed(2)} (${percentage.toFixed(1)}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Trend chart instance
    let trendChart;
    function updateTrendChart() {
      const trendData = budgetApp.getTrendData(6);
      
      const ctx = document.getElementById('trendChart').getContext('2d');
      
      if (trendChart) {
        trendChart.destroy();
      }
      
      trendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trendData.map(item => `${item.year}-${String(item.month).padStart(2, '0')}`),
          datasets: [
            {
              label: 'Income',
              data: trendData.map(item => item.income),
              borderColor: '#4BC0C0',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.1,
              fill: true
            },
            {
              label: 'Expenses',
              data: trendData.map(item => item.expenses),
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              tension: 0.1,
              fill: true
            },
            {
              label: 'Savings',
              data: trendData.map(item => item.savings),
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              tension: 0.1,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    
    // Event listeners
    typeSelect.addEventListener('change', updateCategoryOptions);
    
    transactionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;
      const description = document.getElementById('description').value;
      
      try {
        budgetApp.addTransaction(amount, type, category, date, description);
        transactionForm.reset();
        document.getElementById('date').valueAsDate = new Date();
        updateBalance();
        generateReport();
      } catch (error) {
        alert(error.message);
      }
    });
    
    generateReportBtn.addEventListener('click', generateReport);
    
    // Initial setup
    updateCategoryOptions();
    updateBalance();
    generateReport();
