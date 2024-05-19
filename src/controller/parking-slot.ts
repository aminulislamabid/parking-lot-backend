import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../db/db";
import { parkingSlot } from "../db/schema";

const parkVehicle = async (req: Request, res: Response) => {
  const { slotId } = req.body;

  try {
    const selectedParkingSlot = await db.query.parkingSlot.findFirst({
      where: eq(parkingSlot.id, slotId),
    });

    if (!selectedParkingSlot) {
      return res.status(400).json({ message: "Slot not found" });
    }

    if (selectedParkingSlot.status === "occupied") {
      return res.status(400).json({ message: "Vehicle already parked" });
    }

    await db
      .update(parkingSlot)
      .set({ status: "occupied", parkedAt: new Date() })
      .where(eq(parkingSlot.id, slotId));

    res.status(200).json({ message: "Vehicle parked successfully" });
  } catch (error) {
    console.error("Error parking vehicle:", error);
    res
      .status(500)
      .json({ error: "An error occurred while parking the vehicle" });
  }
};

const unParkVehicle = async (req: Request, res: Response) => {
  const { slotId } = req.body;

  try {
    const selectedParkingSlot = await db.query.parkingSlot.findFirst({
      where: eq(parkingSlot.id, slotId),
    });

    if (!selectedParkingSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (selectedParkingSlot.status === "free") {
      return res.status(400).json({ message: "Vehicle already unparked" });
    }

    // Calculate parking fee (10$ per hour, rounding up)
    const parkedAt = selectedParkingSlot.parkedAt;
    const now = new Date();
    const parkedDuration = parkedAt
      ? Math.ceil((now.getTime() - parkedAt.getTime()) / (1000 * 60 * 60))
      : 0; // Duration in hours
    const parkingFee = parkedDuration * 10;

    await db
      .update(parkingSlot)
      .set({ status: "free", parkedAt: null })
      .where(eq(parkingSlot.id, slotId));

    res.status(200).json({
      message: `Vehicle unparked with parking fee $${parkingFee}`,
    });
  } catch (error) {
    console.error("Error unparking vehicle:", error);
    res
      .status(500)
      .json({ error: "An error occurred while unparking the vehicle" });
  }
};

export { parkVehicle, unParkVehicle };
