export interface Trip {
  id: string;
  name: string;
  selectedDestination: string | null;
  imageUrls: Array<string | null>;
  ownerEmail: string;
}

export interface TripPayload {
  destinationId?: string;
  anywhere: boolean;
  date?: {
    start?: Date;
    end?: Date;
  };
  userId: string;
}
