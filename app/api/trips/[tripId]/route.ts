import { constructResponse } from "../../helpers";
import { querySingleTrip } from "./queries";

export const GET = async (
  req: Request,
  { params }: { params: { tripId: string } }
) => {
  const { tripId } = params;
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
  } catch (error) {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
