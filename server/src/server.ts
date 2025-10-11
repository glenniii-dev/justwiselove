import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...')
});

app.listen(port, () => {
  console.log(`Server successfully started on port: ${port}`)
});