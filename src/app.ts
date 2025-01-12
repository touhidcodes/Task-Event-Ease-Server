import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Application Routes
// Import and use your routes here

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World !.. Server is running...");
});

export default app;
