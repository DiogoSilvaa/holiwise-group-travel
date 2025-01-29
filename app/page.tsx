"use client";

import { TripFolder } from "@/components/trip-folder/trip-folder";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: trips } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const r = await fetch(
        "/api/trips?userId=26fd3b29-c5d4-4f9b-873e-2c75f8ea84c1"
      );
      return await r.json();
    },
  });

  return (
    <div className="container px-6 flex flex-col space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">My trips</h1>
        <h2 className="mt-3.5 text-gray-800/65">
          Organise all your travel planning in one place
        </h2>
      </div>
      <section>
        <div className="flex space-x-4">
          <p className="font-bold text-2xl">My trips</p>
          <button className="">+ Create</button>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <TripFolder />
        </div>
      </section>
      <section>
        <p className="font-bold text-2xl">My destinations</p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <TripFolder />
        </div>
      </section>
    </div>
  );
};

export default Home;
