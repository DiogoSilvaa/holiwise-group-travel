import { db } from "@/lib/db";
import { Destination } from "./types";

export const queryAllDestinations = async (tripId: string | null): Promise<Destination[]> => {
  let query = db.selectFrom("destination as d").selectAll();
  if (tripId) {
    query = query
      .leftJoin("trip_destination as td", "td.destination_id", "d.id")
      .where("td.trip_id", "=", tripId);
  }
  return query.execute();
};
