import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", customerRoutes);
app.use(errorHandler);

export default app;
