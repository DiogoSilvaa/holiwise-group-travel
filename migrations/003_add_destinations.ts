import { DB } from "@/lib/db/schema";
import { Kysely } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
  db.insertInto("destination")
    .values({
      image_url: "/images/lisbon.webp",
      name: "Lisbon",
      type: "city",
    })
    .execute();
  db.insertInto("destination")
    .values({
      image_url: "/images/cancun.webp",
      name: "Cancun",
      type: "beach",
    })
    .execute();
  db.insertInto("destination")
    .values({
      image_url: "/images/aguadilla.webp",
      name: "Aguadilla",
      type: "beach",
    })
    .execute();
};

export const down = async (db: Kysely<DB>): Promise<void> => {
  db.deleteFrom("destination").where("name", "in", ["Cancun", "Aguadilla", "Lisbon"]).execute();
};
