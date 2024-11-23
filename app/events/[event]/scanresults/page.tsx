"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import Image from "next/image";
import InfoCard from "@/app/components/DashboardLayout/InfoCard2";
import InfoCardM from "@/app/components/DashboardLayout/OtherInfoCard2";
import EventSection from "@/app/components/DashboardLayout/DiscoverEventSection";
import { useGetDiscoveryEvents, useAddEventToDiscovery } from "@/app/hooks/event/event.hook";
import { Skeleton, Button, Modal } from "antd";
import { useEffect } from "react";
import { IEventDetails } from "@/app/utils/interface";
import { useParams, useRouter } from "next/navigation";
import placeholder from "@/public/placeholder.svg";
import CheckInSuccessModal from "@/app/components/OstivitiesModal/CheckInSuccessModal";
import TicketValidationModal from "@/app/components/OstivitiesModal/TicketValidation";

function ScanResults(): JSX.Element {
    const router = useRouter();

    // Modal visibility states
    const [isTicketValidateVisible, setIsTicketValidateVisible] = useState(false);
    const [isCheckInVisible, setIsCheckInVisible] = useState(false);

    const handleCheckIn = () => {
        // Open the TicketValidation modal
        setIsCheckInVisible(true);
    };

    const handleClose = () => {
        // Close both modals
        setIsCheckInVisible(false);
    };

    const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 5);
    const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
    const params = useParams<{ event: string }>();
    const isPending = getDiscoveryEvents?.isLoading;

    const filteredEvents = discoveryEvents?.filter(
        (event: IEventDetails) =>
            new Date(event.endDate).getTime() > new Date().getTime()
    );

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
        <DashboardLayout title={title} isLoggedIn>
            <>
                <EventSection
                    title=""
                    titleClass="custom-title-class"
                    style={{
                        fontFamily: "Bricolage Grotesque, font-semibold",
                    }}
                >
                    {isPending ? (
                        <Skeleton.Button
                            active
                            shape="round"
                            style={{
                                height: "300px",
                                width: "1160px",
                                margin: "10px",
                                maxWidth: "100%",
                            }}
                        />
                    ) : (
                        filteredEvents?.map((event: IEventDetails) => (
                            <InfoCard
                                key={event?.id}
                                title={event?.eventName}
                                about={event?.eventType}
                                image={event?.eventImage ? event.eventImage : placeholder}
                                titleClass="font-bricolage-grotesque font-medium"
                                aboutClass="font-bricolage-grotesque"
                                statusClass="font-bricolage-grotesque font-medium"
                            />
                        ))
                    )}
                </EventSection>

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
                    <div style={{ width: "100%", marginBottom: "23px", marginTop: "15px" }}>
                        {[
                            { label: "Guest Name", value: "Ayatullah Olowu" },
                            { label: "Ticket Type", value: "Collective" },
                            { label: "Order Date", value: "Sun. 29th Sep, 2024" },
                            { label: "Ticket Name", value: "Premium" },
                            { label: "Checked In Status", value: "Not Checked In" },
                            { label: "Checked In", value: "0/1 ticket(s)" },
                        ].map((item, index) => (
                            <div
                                key={index}
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
                                    {item.label}:
                                </p>
                                <p
                                    style={{
                                        color: "#e74c3c",
                                        fontWeight: "bold",
                                        fontFamily: "Bricolage Grotesque",
                                    }}
                                >
                                    {item.value}
                                </p>
                            </div>
                        ))}
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
                            onClick={() => router.push(`/events/${params?.event}/scanner`)}
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
                            onClick={handleCheckIn}
                        >
                            Check In
                        </Button>
                    </div>
                </div>

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
