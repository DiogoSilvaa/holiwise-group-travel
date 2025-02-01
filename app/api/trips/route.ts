import { constructResponse } from "../helpers";
import { createTrip } from "./mutations";
import { queryAllTrips } from "./queries";
import { TripPayload } from "./types";

export const GET = async (req: Request) => {
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId || typeof userId != "string") {
    return constructResponse({ error: "Missing required field: id" }, 400);
  }

  try {
    const trips = await queryAllTrips(userId);
    return constructResponse(trips, 200);
  } catch (error) {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const POST = async (req: Request) => {
  try {
    const requestBody: TripPayload = await req.json();
    const { userId, anywhere, destinationId } = requestBody;

    if (!userId || (!anywhere && destinationId === "")) {
      return constructResponse({ error: "Missing required fields" }, 400);
    }

    const newTrip = await createTrip(requestBody);

    return constructResponse(newTrip, 201);
  } catch (error) {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
