import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
  // Destination table
  await db.schema
    .createTable("destination")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("image_url", "text", (col) => col.notNull())
    .execute();

  // Trip table
  await db.schema
    .createTable("trip")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("owner_id", "uuid", (col) => col.notNull().references("User.id").onDelete("cascade"))
    .addColumn("status", "text", (col) => col.defaultTo("active"))
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("start_date", "date")
    .addColumn("end_date", "date")
    .addColumn("selected_destination_id", "uuid", (col) =>
      col.references("destination.id").onDelete("set null")
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Trip destination link table
  await db.schema
    .createTable("trip_destination")
    .addColumn("trip_id", "uuid", (col) => col.notNull().references("trip.id").onDelete("cascade"))
    .addColumn("destination_id", "uuid", (col) =>
      col.notNull().references("destination.id").onDelete("cascade")
    )
    .addPrimaryKeyConstraint("trip_destination_pkey", ["trip_id", "destination_id"])
    .execute();

  // Trip access link table
  await db.schema
    .createTable("trip_access")
    .addColumn("trip_id", "uuid", (col) => col.notNull().references("trip.id").onDelete("cascade"))
    .addColumn("user_id", "uuid", (col) => col.notNull().references("User.id").onDelete("cascade"))
    .addPrimaryKeyConstraint("trip_access_pkey", ["trip_id", "user_id"])
    .execute();

  // Trip votes table
  await db.schema
    .createTable("trip_votes")
    .addColumn("trip_id", "uuid", (col) => col.notNull().references("trip.id").onDelete("cascade"))
    .addColumn("destination_id", "uuid", (col) =>
      col.notNull().references("destination.id").onDelete("cascade")
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("User.id").onDelete("cascade"))
    .addPrimaryKeyConstraint("trip_votes_pkey", ["trip_id", "destination_id", "user_id"])
    .execute();

  // Add indexes
  await db.schema.createIndex("idx_trip_owner").on("trip").column("owner_id").execute();
  await db.schema
    .createIndex("idx_trip_selected_dest")
    .on("trip")
    .column("selected_destination_id")
    .execute();
  await db.schema
    .createIndex("idx_trip_dest")
    .on("trip_destination")
    .columns(["trip_id", "destination_id"])
    .execute();
  await db.schema
    .createIndex("idx_trip_votes")
    .on("trip_votes")
    .columns(["trip_id", "destination_id", "user_id"])
    .execute();
  await db.schema
    .createIndex("idx_trip_access")
    .on("trip_access")
    .columns(["trip_id", "user_id"])
    .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropIndex("idx_trip_owner").execute();
  await db.schema.dropIndex("idx_trip_selected_dest").execute();
  await db.schema.dropIndex("idx_trip_dest").execute();
  await db.schema.dropIndex("idx_trip_votes").execute();
  await db.schema.dropIndex("idx_trip_access").execute();

  await db.schema.dropTable("trip_access").execute();
  await db.schema.dropTable("trip_votes").execute();
  await db.schema.dropTable("trip_destination").execute();
  await db.schema.dropTable("trip").execute();
  await db.schema.dropTable("destination").execute();
};
