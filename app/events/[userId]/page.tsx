"use client";

import DiscoverEvents from "@/app/components/DashboardLayout/OtherEvents";
import UpcomingEvents from "@/app/components/DashboardLayout/UpcomingEvents";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Button, Dropdown, MenuProps, Space, Modal, Skeleton } from "antd";
import React, { useState } from "react";

function Discover(): JSX.Element {
  const header = (
    <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: "24px" }}>Discovery</h1>
    </div>
  );

  return (
    <DashboardLayout title={header}>
      <div className="flex flex-col gap-10">
        <DiscoverEvents />
        <div className="border-[1px]  rounded-[24px] shadow-md"></div>
        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-1">
          <button className={`relative font-semibold pb-2 text-red-600`}>
            Upcoming Events
            <div
              className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full"
              style={{ borderRadius: "25px" }}
            />
          </button>
        </div>
        <UpcomingEvents />
      </div>
    </DashboardLayout>
  );
}

export default Discover;
