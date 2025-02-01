export interface Trip {
  id: string;
  name: string;
  selectedDestination: string | undefined;
  imageUrls: Array<string | null>;
  ownerEmail: string;
}

export interface CompleteTrip {
  id: string;
  name: string;
  start: Date | null;
  end: Date | null;
  emailsWithAccess: string[];
  selectedDestination: string | null;
  imageUrls: Array<string>;
  ownerEmail: string;
}

export interface TripPayload {
  id?: string;
  name: string;
  destinationId?: string;
  date?: {
    start?: Date;
    end?: Date;
  };
  status?: string;
  userId: string;
}
