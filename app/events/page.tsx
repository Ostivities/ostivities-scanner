"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import DiscoverEvents from "../components/DashboardLayout/DiscoverEvents";
import PopularEvents from "../components/DashboardLayout/PopularEvents";
import AllEvents from "../components/DashboardLayout/AllEvents";
import { Input, Select, Tabs, Skeleton } from "antd";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { EVENT_TYPES } from "../utils/data";
import useFetch from "../components/forms/create-events/auth";

function Dashboard(): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useFetch();
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  // Get all events for discovery

  const COUNTRY_JSON: any = Country.getAllCountries().map((i: any) => {
    return { value: i?.name, label: i?.name, isoCode: i?.isoCode };
  });

  const STATE_BY_COUNTRYCODE = (
    stateCode: string
  ): { label: string; value: string }[] => {
    const result: any = State.getStatesOfCountry(stateCode);
    const stateJson: { label: string; value: string }[] = result.map(
      (i: any) => {
        return { label: i?.name, value: i?.name };
      }
    );
    return stateJson;
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (searchResults.length === 0) {
      router.push("/events/event-not-found");
    } else {
      // Handle the case where search results are available
      console.log("Search results found:", searchResults);
    }
  };

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: "24px" }}>Events</h1>

      
    </div>
  );

  return (
    <DashboardLayout title={header}>
      <div className="flex flex-col gap-10">
        <DiscoverEvents />
        
        {/* Tab Navigation */}
        <div className="flex space-x-8 -mb-8">
          <button
            className={`relative font-semibold pb-2 ${
              activeTab === "all" ? "text-red-600" : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("all");
              // router.push('/events/all')
            }}
          >
            Upcoming Events
            {activeTab === "all" && (
              <div
                className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full"
                style={{ borderRadius: "25px" }}
              />
            )}
          </button>
         
        </div>

        {/* Popular Events Content */}
        {/* Tab Content */}
        {activeTab === "popular" && <PopularEvents />}
        {activeTab === "all" && <AllEvents />}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
