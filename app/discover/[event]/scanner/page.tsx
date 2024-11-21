"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import QrScanner from "react-qr-scanner";  // Import the QR Scanner
import "@/app/globals.css";

const Scanner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ event: string }>();

  // Destructure the hook
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);

  // Access event details
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;

  const [scannedData, setScannedData] = useState<string | null>(null);

  // Handle scanning result
  const handleScan = (data: any) => {
    if (data) {
      setScannedData(data);
      console.log("Scanned QR Code:", data);
      router.push(`/discover/${params?.event}/scanresults`)
    }
  };

  // Handle errors during scan
  const handleError = (err: any) => {
    console.error("Scan Error:", err);
  };

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt="Back"
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>Scan Tickets</h1>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="scanner-container">
        {getUserEventByUniqueKey?.isFetching ? (
          <div>Loading...</div>
        ) : eventDetails ? (
          <div>
            {/* QR scanner component */}
            <QrScanner
              delay={300} // Time between frames for scanning
              facingMode="environment" // Use back camera
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }} // Full width for scanner view
            />
          </div>
        ) : (
          <div>No event details found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Scanner;