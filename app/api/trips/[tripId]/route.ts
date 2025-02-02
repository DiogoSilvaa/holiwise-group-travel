import { constructResponse } from "../../helpers";
import { deleteTrip, updateTrip } from "./mutations";
import { querySingleTrip } from "./queries";

export const GET = async (req: Request, { params }: { params: Promise<{ tripId: string }> }) => {
  const { tripId } = await params;
  const userId = new URL(req.url).searchParams.get("userId");

  if (!userId || typeof userId !== "string") {
    return constructResponse({ error: "Missing required field: userId" }, 400);
  }

  try {
    const trip = await querySingleTrip(tripId, userId);
    if (!trip) {
      return constructResponse({ error: "Trip not found" }, 404);
    }
    return constructResponse(trip, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const PATCH = async (req: Request, { params }: { params: Promise<{ tripId: string }> }) => {
  const { tripId } = await params;
  const updates = await req.json();

  try {
    await updateTrip(tripId, updates);
    return constructResponse({ success: true }, 200);
  } catch {
    return constructResponse({ error: "Update failed" }, 500);
  }
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ tripId: string }> }) => {
  const { tripId } = await params;

  try {
    await deleteTrip(tripId);
    return constructResponse({ success: true, tripId }, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
