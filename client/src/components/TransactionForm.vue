<template>
  <div>
    <h2>{{ form.id ? "Edit Transaction" : "Add Transaction" }}</h2>

    <form @submit.prevent="saveTransaction">

      <select v-model="form.type" required>
        <option value="">Select Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input 
        type="number" 
        v-model="form.amount" 
        placeholder="Amount" 
        required 
      />

      <input 
        type="text" 
        v-model="form.category" 
        placeholder="Category" 
        required 
      />

      <input 
        type="text" 
        v-model="form.note" 
        placeholder="Note" 
      />

      <input 
        type="date" 
        v-model="form.date" 
        required 
      />

      <button type="submit">
        {{ form.id ? "Update" : "Add" }}
      </button>

    </form>
  </div>
</template>

<script>
import API from "../services/api";

export default {
  props: ["editData"],   // 🔥 รับข้อมูลแก้ไขจาก App.vue

  data() {
    return {
      form: {
        id: null,
        type: "",
        amount: "",
        category: "",
        note: "",
        date: ""
      }
    };
  },

  watch: {
    editData(newVal) {
      if (newVal) {
        this.form = { ...newVal };   // โหลดข้อมูลเข้า form
      }
    }
  },

  methods: {
    async saveTransaction() {
      try {

        if (this.form.id) {
          // 🔥 โหมดแก้ไข
          await API.put(`/transactions/${this.form.id}`, this.form);
        } else {
          // 🔥 โหมดเพิ่ม
          await API.post("/transactions", this.form);
        }

        this.$emit("transaction-added");

        // รีเซ็ตฟอร์ม
        this.form = {
          id: null,
          type: "",
          amount: "",
          category: "",
          note: "",
          date: ""
        };

      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>