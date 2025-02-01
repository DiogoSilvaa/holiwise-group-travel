import { constructResponse } from "../helpers";
import { queryAllDestinations } from "./queries";

export const GET = async (req: Request) => {
  const tripId = new URL(req.url).searchParams.get("tripId");

  const dests = await queryAllDestinations(tripId);
  return constructResponse(dests, 200);
};
