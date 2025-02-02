import { constructResponse } from "../helpers";
import { toggleTripVote } from "./mutations";
import { queryTripVotes } from "./queries";
import { TripVotePayload } from "./types";

export const POST = async (req: Request) => {
  try {
    const payload: TripVotePayload = await req.json();

    if (!payload.tripId || !payload.destinationId || !payload.userId) {
      return constructResponse(
        { error: "Missing required fields: tripId, destinationId, userId" },
        400
      );
    }

    const result = await toggleTripVote(payload);
    return constructResponse(result, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("tripId");
    const destinationId = searchParams.get("destinationId");
    const userId = searchParams.get("userId");

    if (!tripId || !destinationId || !userId) {
      return constructResponse(
        {
          error: "Missing required query parameters: tripId, destinationId, userId",
        },
        400
      );
    }

    const result = await queryTripVotes(tripId, destinationId, userId);
    return constructResponse(result, 200);
  } catch {
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
