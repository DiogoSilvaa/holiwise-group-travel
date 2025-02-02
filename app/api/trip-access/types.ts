export interface TripAccessPayload {
  tripId: string;
  email: string;
}

export interface TripAccessResult {
  tripId: string;
  userId: string;
  email: string;
}

export interface TripAllowedUsers {
  tripId: string;
  allowedEmails: string[];
}
