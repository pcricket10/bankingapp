import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { createAccount, login, viewAccountDetails } from './api/customers.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/api/create-account', createAccount);
// app.post('/api/login', login);
app.get('/api/customer/:acctNumber', viewAccountDetails);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
