import express from "express";
import { parkVehicle, unParkVehicle } from "../controller/parking-slot";

const parkingSlotRoutes = express.Router();

parkingSlotRoutes.patch("/park", parkVehicle);
parkingSlotRoutes.patch("/unpark", unParkVehicle);

export default parkingSlotRoutes;
