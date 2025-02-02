"use client";

import { ListChecks, MapPin, Bed, PlaneTakeoff, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import classNames from "classnames";
import { DestinationsTab } from "./destinations-tab";
import { CompleteTrip } from "@/app/api/trips/types";
import { FC } from "react";

interface TabConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  disabled: boolean;
}

interface TripTabsProps {
  trip: CompleteTrip;
}

const tabConfigs: (trip: CompleteTrip) => TabConfig[] = (trip) => [
  {
    value: "overview",
    label: "Overview",
    icon: <ListChecks className="mr-1" />,
    content: <p>Placeholder</p>,
    disabled: true,
  },
  {
    value: "destinations",
    label: "Destinations",
    icon: <MapPin className="mr-1 stroke-[1.5px]" />,
    content: <DestinationsTab trip={trip} />,
    disabled: false,
  },
  {
    value: "stays",
    label: "Stays",
    icon: <Bed className="mr-1" />,
    content: <p>Placeholder</p>,
    disabled: true,
  },
  {
    value: "flight",
    label: "Flight",
    icon: <PlaneTakeoff className="mr-1" />,
    content: <p>Placeholder</p>,
    disabled: true,
  },
  {
    value: "itinerary",
    label: "Itinerary",
    icon: <Calendar className="mr-1" />,
    content: <p>Placeholder</p>,
    disabled: true,
  },
];

export const TripTabs: FC<TripTabsProps> = ({ trip }) => {
  const tabs = tabConfigs(trip);

  return (
    <Tabs defaultValue="destinations">
      <div className="overflow-x-auto overflow-y-hidden no-scrollbar w-full border-b border-gray-400 bg-white">
        <TabsList className="flex gap-8 min-w-max bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="py-4 text-base relative data-[state=active]:shadow-none"
            >
              <div
                className={classNames(
                  "flex items-center justify-center px-3",
                  !tab.disabled && "border-b-[5px] border-primary-500 pb-2 border-"
                )}
              >
                {tab.icon}
                {tab.label}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="bg-white pt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
