"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import QrScanner from "qr-scanner";  // Import the qr-scanner library
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!eventDetails) return; // Run only when eventDetails are available

    // Initialize QR scanner
    const qrScanner = new QrScanner(videoRef.current!, (result) => {
      if (result) {
        setScannedData(result);
        console.log("Scanned QR Code:", result);
        router.push(`/details/${result}`);
      }
    });

    // Start the scanner
    qrScanner.start();

    // Cleanup the scanner when the component is unmounted or eventDetails change
    return () => {
      qrScanner.stop();
    };
  }, [eventDetails, router]);

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
            {/* QR scanner view */}
            <video ref={videoRef} width="100%" height="auto" />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        ) : (
          <div>No event details found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Scanner;