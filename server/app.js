const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ดึงทั้งหมด
app.get("/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// เพิ่ม
app.post("/transactions", (req, res) => {
  const { type, amount, category, note, date } = req.body;

  const sql = `
    INSERT INTO transactions (type, amount, category, note, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [type, amount, category, note, date], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Added successfully" });
  });
});

// ลบ
app.delete("/transactions/:id", (req, res) => {
  db.run("DELETE FROM transactions WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
});

// แก้ไข
app.put("/transactions/:id", (req, res) => {
  const { type, amount, category, note, date } = req.body;

  const sql = `
    UPDATE transactions
    SET type=?, amount=?, category=?, note=?, date=?
    WHERE id=?
  `;

  db.run(sql, [type, amount, category, note, date, req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
});

// Summary
app.get("/summary", (req, res) => {
  const sql = `
    SELECT
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS totalExpense
    FROM transactions
  `;

  db.get(sql, [], (err, row) => {
    if (err) return res.status(500).json(err);

    const totalIncome = row.totalIncome || 0;
    const totalExpense = row.totalExpense || 0;

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
