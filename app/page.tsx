"use client";
import React, { useState, useEffect } from "react";
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import LoginForm from "@/app/components/forms/Login";
import { Heading5, Small } from "@/app/components/typography/Typography";
import Link from "next/link";

function Login() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Activate content for mobile dimensions
      } else {
        setIsMobile(false); // Block content for non-mobile devices
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile); // Update on screen resize

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isMobile) {
    // Render a message for non-mobile devices
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Mobile App Only</h1>
          <p className="text-gray-600">
            This application is designed for mobile devices. Please use a mobile
            device to access the app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className=""> {/* Add margin-top to create space from AuthLayout */}
        <div className="flex flex-col space-y-16">
          <Small
            content={
              <span className="text-sm font-BricolageGrotesqueRegular">
                <Link
                  href={"/signup"}
                  className="text-OWANBE_PRY underline hover:text-OWANBE_PRY hover:underline"
                ></Link>
              </span>
            }
            className="float-right place-self-end"
          />

          <div className="md:w-4/5 md:mx-auto flex flex-col space-y-8">
            <Heading5 className="" content="Sign into your account" />
            <LoginForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
