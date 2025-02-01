export interface Trip {
  id: string;
  owner_email: string;
  image_urls: Array<string | null>;
  selected_destination_id: string | null;
}

export interface TripPayload {
  destinationId?: string;
  anywhere: boolean;
  date?: {
    start?: Date;
    end?: Date;
  };
  userEmail: string;
}
