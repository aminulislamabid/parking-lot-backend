import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import parkingLotRoutes from "./routes/parkingLotRoutes";
import parkingSlotRoutes from "./routes/parkingSlotRoutes";
import errorHandler from "./utils/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Parking Lot API!");
});

// Routes
app.use("/parking-lot", parkingLotRoutes);
app.use("/parking-slot", parkingSlotRoutes);

// Error Handler Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
