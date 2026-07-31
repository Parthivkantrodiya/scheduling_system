import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Server Running");
});


app.use("/api", routes);


connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
