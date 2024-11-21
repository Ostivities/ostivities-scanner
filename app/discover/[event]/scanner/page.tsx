"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import QrScanner from "react-qr-scanner";
import "@/app/globals.css";

const Scanner = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Get available cameras and select the back camera
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );

        if (backCamera) {
          navigator.mediaDevices
            .getUserMedia({
              video: { deviceId: backCamera.deviceId },
            })
            .then((stream) => {
              setCameraStream(stream);

              if (videoRef.current) {
                videoRef.current.srcObject = stream; // Attach stream to video element
                videoRef.current.play();
              }
            })
            .catch((err) => console.error("Camera access error:", err));
        } else {
          console.error("No back camera found");
        }
      })
      .catch((err) => console.error("Error enumerating devices:", err));

    // Cleanup camera stream on unmount
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleScan = (data: any) => {
    if (data) {
      setScannedData(data);
      console.log("Scanned QR Code:", data);
      router.push(`/discover/${params?.event}/scanresults`);
    }
  };

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
        <div>
          {cameraStream ? (
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          ) : (
            <div>Loading camera...</div>
          )}
          <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Scanner;