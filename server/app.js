const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

// ดึงทั้งหมด
app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) return res.status(500).send(err)
    res.json(results)
  })
})

// เพิ่ม
app.post('/transactions', (req, res) => {
  const { type, amount, category, note, date } = req.body
  const sql = 'INSERT INTO transactions (type, amount, category, note, date) VALUES (?, ?, ?, ?, ?)'
  db.query(sql, [type, amount, category, note, date], (err, result) => {
    if (err) return res.status(500).send(err)
    res.json({ message: 'Added successfully' })
  })
})

// ลบ
app.delete('/transactions/:id', (req, res) => {
  db.query('DELETE FROM transactions WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.json({ message: 'Deleted successfully' })
  })
})

// แก้ไข
app.put('/transactions/:id', (req, res) => {
  const { type, amount, category, note, date } = req.body
  const sql = 'UPDATE transactions SET type=?, amount=?, category=?, note=?, date=? WHERE id=?'
  db.query(sql, [type, amount, category, note, date, req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.json({ message: 'Updated successfully' })
  })
})

// Summary (Aggregate)
app.get('/summary', (req, res) => {
  const sql = `
    SELECT
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense
    FROM transactions
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);

    const totalIncome = result[0].totalIncome || 0;
    const totalExpense = result[0].totalExpense || 0;

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000')
})