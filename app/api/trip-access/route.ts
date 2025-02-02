import { addTripAccess, removeTripAccess } from "./mutations";
import { queryTripAccess } from "./queries";
import { constructResponse } from "../helpers";
import { TripAccessPayload } from "./types";

export const POST = async (req: Request) => {
  try {
    const payload: TripAccessPayload = await req.json();
    if (!payload.tripId || !payload.email) {
      return constructResponse({ error: "Missing required fields: tripId and email" }, 400);
    }
    const result = await addTripAccess(payload);
    return constructResponse(result, 201);
  } catch (error) {
    console.error("Error adding trip access:", error);
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const payload: TripAccessPayload = await req.json();
    if (!payload.tripId || !payload.email) {
      return constructResponse({ error: "Missing required fields: tripId and email" }, 400);
    }
    const result = await removeTripAccess(payload);
    return constructResponse(result, 200);
  } catch (error) {
    console.error("Error removing trip access:", error);
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("tripId");
    if (!tripId) {
      return constructResponse({ error: "Missing required query parameter: tripId" }, 400);
    }
    const result = await queryTripAccess(tripId);
    return constructResponse(result, 200);
  } catch (error) {
    console.error("Error fetching trip access:", error);
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
