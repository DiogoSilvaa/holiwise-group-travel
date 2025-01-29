import { db } from "@/lib/db";
import { Destination } from "./types";

export const queryAllDestinations = async (): Promise<Destination[]> => {
  const destinations = await db.selectFrom("destination").selectAll().execute();
  return destinations;
};
