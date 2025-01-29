import { constructResponse } from "../helpers";
import { queryAllTrips } from "./queries";

export const GET = async (req: Request) => {
  const userId = new URL(req.url).searchParams.get("userId");
  console.log("userId", userId);
  if (!userId || typeof userId != "string") {
    return constructResponse({ error: "Missing required field: id" }, 400);
  }
  try {
    const trips = queryAllTrips(userId);
    return constructResponse(trips, 200);
  } catch (error) {
    console.error(error);
    return constructResponse({ error: "Internal server error" }, 500);
  }
};
