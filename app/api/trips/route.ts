import { constructResponse } from "../helpers";
import { createTrip } from "./mutations";
import { queryAllTrips } from "./queries";
import { TripPayload } from "./types";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId || typeof userId != "string") {
    return constructResponse({ error: "Missing required field: id" }, 400);
  }

  try {
    const trips = await queryAllTrips(userId);
    return constructResponse(trips, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const POST = async (req: Request) => {
  try {
    const requestBody: TripPayload = await req.json();
    const { userId } = requestBody;

    if (!userId) {
      return constructResponse({ error: "Missing required fields" }, 400);
    }

    const tripId = await createTrip(requestBody);

    return constructResponse({ id: tripId }, 201);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
