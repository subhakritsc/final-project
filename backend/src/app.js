import express from "express";
import cors from "cors";
import './config/db.js';

import ItemRoute from "./routes/itemRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/items", ItemRoute);

export default app;
