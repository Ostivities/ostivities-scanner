"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Webcam from "react-webcam"; // Import React Webcam
import jsQR from "jsqr"; // Import jsQR for QR code decoding
import "@/app/globals.css";

const Scanner = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // Function to capture a frame and decode the QR code
  const captureFrame = useCallback(() => {
    if (
      webcamRef.current &&
      canvasRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode && qrCode.data) {
          setScannedData(qrCode.data);
          console.log("Scanned QR Code:", qrCode.data);
          router.push(`/discover/${params?.event}/scanresults`);
        }
      }
    }
  }, [router, params]);

  // Fetch available video devices and set the back camera
  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");

        // Look for a device with "back" or "rear" in the label
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );

        // Use the first available camera as a fallback
        setDeviceId(backCamera?.deviceId || videoDevices[0]?.deviceId || null);
      } catch (err) {
        console.error("Error accessing video devices:", err);
        setError("Failed to access the camera. Please check your device permissions.");
      }
    };

    getVideoDevices();
  }, []);

  useEffect(() => {
    const interval = setInterval(captureFrame, 300); // Scan every 300ms
    return () => clearInterval(interval); // Clear interval on unmount
  }, [captureFrame]);

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
        {error && <p className="error-message">{error}</p>}
        <div className="webcam-container" style={{ position: "relative" }}>
          {deviceId ? (
            <>
              {/* Webcam Feed */}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{
                  deviceId: deviceId, // Use the selected device ID
                }}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />

              {/* Canvas for QR Code Decoding */}
              <canvas
                ref={canvasRef}
                style={{ display: "none" }} // Canvas is hidden
              />
            </>
          ) : (
            <p>Loading camera...</p>
          )}
        </div>
        {scannedData && (
          <div className="scanned-data">
            <p>Scanned Data: {scannedData}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Scanner;