export interface Trip {
  id: string;
  name: string;
  selectedDestination: string | null;
  imageUrls: Array<string | null>;
  ownerEmail: string;
}

export interface TripPayload {
  destinationId: string | null;
  date?: {
    start?: Date | null;
    end?: Date | null;
  };
  userId: string;
  name: string;
}
