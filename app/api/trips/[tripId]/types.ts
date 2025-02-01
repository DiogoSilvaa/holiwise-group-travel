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
