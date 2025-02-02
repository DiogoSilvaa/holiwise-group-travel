import { constructResponse } from "../helpers";
import { addTripDestination, removeTripDestination } from "./mutations";

export const POST = async (req: Request) => {
  try {
    const { tripId, destinationId } = await req.json();

    if (!tripId || !destinationId) {
      return constructResponse({ error: "Missing required fields: tripId and destinationId" }, 400);
    }

    await addTripDestination(tripId, destinationId);

    return constructResponse({ tripId, destinationId }, 201);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { tripId, destinationId } = await req.json();

    if (!tripId || !destinationId) {
      return constructResponse({ error: "Missing required fields: tripId and destinationId" }, 400);
    }

    await removeTripDestination(tripId, destinationId);

    return constructResponse({ tripId, destinationId }, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
