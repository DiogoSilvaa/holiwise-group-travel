export interface Trip {
  id: string;
  owner_email: string | null;
  image_urls: Array<string | null>;
  selected_destination_id: string | null;
}
