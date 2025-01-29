import { constructResponse } from "../helpers";
import { queryAllDestinations } from "./queries";

export const GET = async () => {
  const dests = await queryAllDestinations();
  return constructResponse(dests, 200);
};
