"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import Image from "next/image";
import InfoCard from "@/app/components/DashboardLayout/InfoCard2";
import EventSection from "@/app/components/DashboardLayout/DiscoverEventSection";
import { Skeleton, Button, Modal } from "antd";
import {
  useCheckInGuest,
  useGetGuestInfoScanners,
} from "@/app/hooks/checkin/checkin.hook";
import { jwtDecode } from "jwt-decode";
import { CHECK_IN_STATUS } from "@/app/utils/enums";


interface DecodedToken {
  staff_name: string;
}
import { dateFormat } from "@/app/utils/helper";
import { useParams, useRouter } from "next/navigation";
import placeholder from "@/public/placeholder.svg";
import CheckInSuccessModal from "@/app/components/OstivitiesModal/CheckInSuccessModal";
import { useCookies } from "react-cookie";

function ScanResults(): JSX.Element {
  const router = useRouter();
  const [cookies, removeCookie] = useCookies(["token"]);
  const decoded = jwtDecode<DecodedToken>(cookies?.token);
  const { checkInGuest } = useCheckInGuest();
  // Modal visibility states
  const [isCheckInVisible, setIsCheckInVisible] = useState(false);
  const params = useParams<{
    event: string;
    event_id: string;
    guest_id: string;
    ticket_id: string;
  }>();
  const { getGuestInfoScanners } = useGetGuestInfoScanners(
    params?.event_id,
    params?.guest_id,
    params?.ticket_id
  );

  const guestInfo = getGuestInfoScanners?.data?.data?.data;
  console.log(getGuestInfoScanners, "getGuestInfoScanners");
  const handleCheckIn = async () => {
    // Open the TicketValidation modal
    const response = await checkInGuest.mutateAsync({
      event_id: params?.event_id,
      guest_id: params?.guest_id,
      ticket_id: params?.ticket_id,
      check_in_date: dateFormat(Date.now().toString()),
      check_in_by: decoded?.staff_name,
    });
    console.log(response, "response");
    if (response.status === 200) {
      setIsCheckInVisible(true);
    }
  };

  const handleClose = () => {
    // Close both modals
    setIsCheckInVisible(false);
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
      <h1 style={{ fontSize: "24px", fontFamily: "Bricolage Grotesque" }}>
        Ticket Details
      </h1>
    </div>
  );

  return (
    <DashboardLayout title={title} event_unique_key={params?.event} isLoggedIn>
      <>
        <EventSection
          title=""
          titleClass="custom-title-class"
          style={{
            fontFamily: "Bricolage Grotesque, font-semibold",
          }}
        >
          {getGuestInfoScanners?.isLoading ? (
            <Skeleton.Button
              active
              className="relative w-full h-[320px] rounded-[2.5rem]"
              shape="round"
              style={{
                height: "100%",
                width: "100%",
                margin: "6px",
                maxWidth: "100%",
              }}
            />
          ) : (
            <InfoCard
              title={guestInfo?.event_information?.event_name}
              about={guestInfo?.event_information?.event_type}
              image={
                guestInfo?.event_information?.event_appearance
                  ? guestInfo?.event_information?.event_appearance
                  : placeholder
              }
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
          )}
        </EventSection>

        {getGuestInfoScanners?.isLoading ? (
          <Skeleton
            active
            className="relative w-full h-[320px] rounded-[2.5rem]"
            paragraph={{ rows: 2}}
            style={{
              height: "100%",
              width: "100%",
              margin: "6px",
              maxWidth: "100%",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "600px",
              margin: "35px auto",
            }}
          >
            <div
              style={{ width: "100%", marginBottom: "23px", marginTop: "15px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Guest Name
                </p>
                <p
                  style={{
                    color: "#e74c3c",
                    fontWeight: "bold",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {`${guestInfo?.personal_information?.firstName} ${guestInfo?.personal_information?.lastName}`}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Order Date
                </p>
                <p
                  style={{
                    color: "#e74c3c",
                    fontWeight: "bold",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {dateFormat(guestInfo?.personal_information?.createdAt)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Ticket Name
                </p>
                <p
                  style={{
                    color: "#e74c3c",
                    fontWeight: "bold",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {guestInfo?.ticket_information?.ticket_name}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Checked In Status
                </p>
                <p
                  style={{
                    color: "#e74c3c",
                    fontWeight: "bold",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {guestInfo?.check_in_status === CHECK_IN_STATUS.NOT_CHECKED_IN
                    ? "Not Checked In"
                    : "Checked In"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Checked In
                </p>
                <p
                  style={{
                    color: "#e74c3c",
                    fontWeight: "bold",
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {`${guestInfo?.total_checked_in_tickets}/${guestInfo?.total_purchased}`}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Button
                type="default"
                size="large"
                className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
                style={{
                  width: "150px",
                  padding: "10px 20px",
                  fontFamily: "Bricolage Grotesque",
                }}
                onClick={() => router.push(`/${params?.event}/scanner`)}
              >
                Cancel
              </Button>
              <Button
                type="default"
                htmlType="button"
                size="large"
                className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
                style={{
                  width: "150px",
                  padding: "10px 20px",
                  fontFamily: "Bricolage Grotesque",
                }}
                loading={checkInGuest?.isPending}
                onClick={handleCheckIn}
                disabled={checkInGuest?.isPending}
              >
                Check In
              </Button>
            </div>
          </div>
        )}

        {/* Conditionally render modals to avoid overlap */}

        <Modal
          open={isCheckInVisible}
          onCancel={handleClose}
          footer={null}
          closable={false}
          centered
          width={400}
        >
          <CheckInSuccessModal />
        </Modal>
      </>
    </DashboardLayout>
  );
}

export default ScanResults;
