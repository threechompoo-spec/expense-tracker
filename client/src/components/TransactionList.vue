<template>
  <div>
    <h2>Transaction List</h2>

    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="t in transactions" :key="t.id">
          <td>{{ t.type }}</td>
          <td>{{ t.amount }}</td>
          <td>{{ t.category }}</td>
          <td>{{ t.date }}</td>
          <td>
            <button @click="editTransaction(t)">Edit</button>
            <button @click="deleteTransaction(t.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import API from "../services/api";

export default {
  props: ["transactions"],
  methods: {
    async deleteTransaction(id) {
      await API.delete(`/transactions/${id}`);
      this.$emit("transaction-added"); // รีโหลด list
    },
    editTransaction(transaction) {
      this.$emit("edit-transaction", transaction);
    }
  }
};
</script>