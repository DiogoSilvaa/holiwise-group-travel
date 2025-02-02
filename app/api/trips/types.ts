export interface Trip {
  id: string;
  name: string;
  selectedDestinationId: string | null;
  imageUrls: Array<string | null>;
  ownerEmail: string;
}

export interface CompleteTrip {
  id: string;
  name: string;
  start: Date | null;
  end: Date | null;
  emailsWithAccess: string[];
  selectedDestinationId: string | null;
  imageUrls: Array<string>;
  ownerEmail: string;
}

export interface TripPayload {
  id?: string;
  name: string;
  destinationId?: string | null;
  date?: {
    start?: Date;
    end?: Date;
  };
  status?: string;
  userId: string;
}
