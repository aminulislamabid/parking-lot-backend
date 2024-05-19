import express from "express";
import {
  createParkingLot,
  deleteParkingLot,
  getParkingLots,
} from "../controller/parking-lot";

const parkingLotRoutes = express.Router();

parkingLotRoutes.get("/get-parking-lots", getParkingLots);
parkingLotRoutes.post("/create-parking-lot", createParkingLot);
parkingLotRoutes.delete("/:parkingLotId", deleteParkingLot);

export default parkingLotRoutes;
