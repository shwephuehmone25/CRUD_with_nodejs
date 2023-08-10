// require ("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";
import { connect } from "mongoose";
import stockRoute from './routes/stock-route.js';
import cors from "cors";

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: `Hello` }));

app.use('/api/stocks', stockRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    code: 500,
    message: err.message,
  });
});

connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(9000, () => console.log(`Server is listening on port 9000`));
