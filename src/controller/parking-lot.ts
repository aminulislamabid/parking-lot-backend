import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../db/db";
import { parkingLot, parkingSlot } from "../db/schema";

const createParkingLot = async (req: Request, res: Response) => {
  const { name, slot } = req.body;

  try {
    await db.transaction(async (trx) => {
      // Create a parking lot
      const newParkingLot = await trx
        .insert(parkingLot)
        .values({
          name: name,
          slot: slot,
        })
        .returning({ id: parkingLot.id, slot: parkingLot.slot });

      const newlyCreatedLot = newParkingLot[0];

      // Create parking slots for new parking lot
      await trx.insert(parkingSlot).values(
        Array.from({ length: newlyCreatedLot.slot }).map(() => ({
          parkingLotId: newlyCreatedLot.id,
        }))
      );
    });

    res.status(201).json({ message: "Parking lot created successfully" });
  } catch (error) {
    console.error("Error creating parking lot:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the parking lot" });
  }
};

const getParkingLots = async (_req: Request, res: Response) => {
  try {
    const parkingLots = await db.query.parkingLot.findMany({
      columns: {
        id: true,
        name: true,
      },
      with: {
        slots: {
          columns: {
            id: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json(parkingLots);
  } catch (error) {
    console.error("Error fetching parking lots:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching parking lots" });
  }
};

const deleteParkingLot = async (req: Request, res: Response) => {
  const { parkingLotId } = req.params;

  try {
    const selectedParkingLot = await db.query.parkingLot.findFirst({
      where: eq(parkingLot.id, parkingLotId),
    });

    if (!selectedParkingLot) {
      return res.status(404).json({ error: "Parking lot not found" });
    }

    await db.transaction(async (trx) => {
      // Delete parking slots associated with the parking lot
      await trx
        .delete(parkingSlot)
        .where(eq(parkingSlot.parkingLotId, parkingLotId));

      // Delete the parking lot
      await trx.delete(parkingLot).where(eq(parkingLot.id, parkingLotId));
    });

    res
      .status(200)
      .json({ message: "Parking lot and its slots deleted successfully" });
  } catch (error) {
    console.error("Error deleting parking lot:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the parking lot" });
  }
};

export { createParkingLot, deleteParkingLot, getParkingLots };
