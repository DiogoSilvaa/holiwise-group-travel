"use client";

import { Card } from "@/components/card/card";
import { useQuery } from "@tanstack/react-query";
import { Destination } from "./api/destinations/types";
import { TypeSelect } from "@/components/type-select/type-select";
import { useState } from "react";
import { Button } from "@/components/button/button";
import { Plus } from "lucide-react";

const destinationTypeOptions = [
  { value: "beach", text: "Beach destinations" },
  { value: "city", text: "City destinations" },
  { value: "ski", text: "Ski destinations" },
];

const defaultTypeOption = { value: "all", text: "All destinations" };

const Home = () => {
  const { data: dests } = useQuery<Destination[]>({
    queryKey: ["destinations"],
    queryFn: async () => {
      const r = await fetch("/api/destinations");
      return await r.json();
    },
  });

  const [type, setType] = useState("all");
  const destinations =
    type === "all" ? dests : dests?.filter((d) => d.type === type);

  return (
    <div className="container px-6 flex flex-col space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">My trips</h1>
        <h2 className="mt-3.5 text-gray-800/65">
          Organise all your travel planning in one place
        </h2>
      </div>
      <section>
        <div className="flex space-x-4 items-center">
          <p className="font-bold text-2xl">My trips</p>
          <Button
            icon={<Plus size={14} />}
            text="Create"
            className="h-10 w-24 bg-gray-50 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-4">
          <Card name="Lisbon" image_src="/images/lisbon.webp" />
        </div>
      </section>
      <section>
        <p className="font-bold text-2xl mb-1">My destinations</p>
        <TypeSelect
          defaultOption={defaultTypeOption}
          options={destinationTypeOptions}
          setType={setType}
        />
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-3">
          {destinations?.map(({ id, name, image_url }) => (
            <Card name={name} key={id} image_src={image_url} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
