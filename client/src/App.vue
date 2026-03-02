<template>
  <div>
    <h1>Expense Tracker</h1>

    <!-- Summary Dashboard -->
    <div class="dashboard">
      <div class="card income">
        <h3>Total Income</h3>
        <p>฿ {{ summary.totalIncome.toLocaleString() }}</p>
      </div>

      <div class="card expense">
        <h3>Total Expense</h3>
        <p>฿ {{ summary.totalExpense.toLocaleString() }}</p>
      </div>

      <div class="card balance">
        <h3>Balance</h3>
        <p>฿ {{ summary.balance.toLocaleString() }}</p>
      </div>
    </div>

    <TransactionForm 
      :editData="editData"
      @transaction-added="fetchTransactions"
    />

    <TransactionList 
      :transactions="transactions"
      @transaction-added="fetchTransactions"
      @edit-transaction="setEditTransaction"
    />
  </div>
</template>

<script>
import API from "./services/api";
import TransactionForm from "./components/TransactionForm.vue";
import TransactionList from "./components/TransactionList.vue";

export default {
  components: {
    TransactionForm,
    TransactionList
  },
  data() {
    return {
      transactions: [],
      editData: null,
      summary: {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
      }
    };
  },
  methods: {
    async fetchTransactions() {
      const res = await API.get("/transactions");
      this.transactions = res.data;
      this.editData = null;
      await this.fetchSummary();
    },
    async fetchSummary() {
      const res = await API.get("/summary");
      this.summary = res.data;
    },
    setEditTransaction(transaction) {
      this.editData = transaction;
    }
  },
  mounted() {
    this.fetchTransactions();
  }
};
</script>

<style>
body {
  font-family: Inter, sans-serif;
  background-color: #15325d;
  margin: 0;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.dashboard {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.card p {
  font-size: 24px;
  font-weight: bold;
}

.income p {
  color: #16a34a;
}

.expense p {
  color: #dc2626;
}

.balance p {
  color: #2563eb;
}
</style>