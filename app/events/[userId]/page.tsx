"use client";

import AvailableEvents from "@/app/components/DashboardLayout/OtherEvents";
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
          <AvailableEvents />
        </div>
      </DashboardLayout>
    );
  }
  
  export default Discover;
  