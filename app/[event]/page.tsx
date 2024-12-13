"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Button, Dropdown, MenuProps, Space, Modal, Skeleton } from "antd";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import React, { useState } from "react";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  XIcon,
} from "react-share";
import {
  CopyOutlined,
} from "@ant-design/icons";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import placeholder from "@/public/placeholder.svg";
import Head from "next/head";
import { Tooltip } from "antd";
import { Heading3 } from "@/app/components/typography/Heading3";
import { ACCOUNT_TYPE } from "@/app/utils/enums";

const ShareModalContent: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: 600,
          fontFamily: "Bricolage Grotesque",
        }}
      >
        Share Event
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <FacebookShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FacebookIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Facebook
            </p>
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <XIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Twitter
            </p>
          </div>
        </TwitterShareButton>

        <WhatsappShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WhatsappIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Whatsapp
            </p>
          </div>
        </WhatsappShareButton>

        <LinkedinShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LinkedinIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              LinkedIn
            </p>
          </div>
        </LinkedinShareButton>
      </div>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{
              width: "80%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={url}
            readOnly
          />
          <Button onClick={copyToClipboard} icon={<CopyOutlined />}></Button>
        </div>
        {copySuccess && (
          <p style={{ color: "green", marginTop: "10px" }}>{copySuccess}</p>
        )}
      </div>
    </div>
  );
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ event: string }>();
  // console.log(params, 'params');
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  // console.log(getUserEventByUniqueKey, "getUserEventByUniqueKey");

  const eventDetails =
    getUserEventByUniqueKey?.data?.data?.data === null
      ? router.push("/not-found")
      : getUserEventByUniqueKey?.data?.data?.data;
  // console.log(eventDetails, "eventDetails");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    return e;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Open the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModal2 = () => setShowModal(false);

  const eventTitle = eventDetails?.eventName;

  const userFullName =
    eventDetails?.user?.accountType === ACCOUNT_TYPE.PERSONAL
      ? `${eventDetails?.user?.firstName ?? ""} ${eventDetails?.user?.lastName ?? ""
        }`.trim()
      : `${eventDetails?.user?.businessName ?? ""}`;

  const socialLinks = eventDetails?.socials;

  // Countdown logic
  const eventDate = eventDetails?.startDate;
  const eventEndDate = eventDetails?.endDate; // End date if needed
  const eventdates = new Date(eventDate).getTime();
  const eventEnddates = eventEndDate ? new Date(eventEndDate).getTime() : null;


  const [isEventStarted, setIsEventStarted] = useState(false);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);


  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => {
          router.push(`/events`)
        }}
        className="cursor-pointer"
      />

      <h1 style={{ fontSize: "24px" }}>{eventTitle}</h1>
    </div>
  );

  return (
    <DashboardLayout title={title} event_unique_key={params?.event} isLoggedIn>
      <Head>
        <meta property="og:title" content={eventDetails?.eventName} />
        <meta property="og:description" content={eventDetails?.eventDetails} />
        <meta property="og:image" content={eventDetails?.eventImage} />
        <meta
          property="og:url"
          content={`https://ostivities.com/events/${params?.event}`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <section>

        {/* !!!For small screen */}
        <div className="min-[870px]:hidden flex gap-10 flex-col">
          {getUserEventByUniqueKey?.isLoading ? (
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
            <div className="relative w-full h-[320px] rounded-[2.5rem] overflow-hidden bg-white card-shadow ">
              <Image
                src={
                  eventDetails?.eventImage
                    ? eventDetails.eventImage
                    : placeholder
                }
                alt="Event Image"
                fill
                style={{ objectFit: "cover" }}
                className=""
              />
            </div>
          )}
          <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between items-center -mt-3">
            <div>
              {getUserEventByUniqueKey?.isLoading ? (
                <Skeleton.Button
                  active
                  className="relative h-7 sm: w-[150px] md:w-[120px] sm:w-200px] rounded-[1rem]"
                  shape="round"
                  style={{
                    height: "100%",
                    width: "100%",
                    margin: "6px",
                    maxWidth: "100%",
                  }}
                />
              ) : (
                <h2 className="text-xl font-BricolageGrotesqueMedium">
                  {eventDetails?.eventName}
                </h2>
              )}
            </div>
            <div className="flex items-center space-x-3">
            </div>
          </div>{" "}

          <div className="rounded-lg flex flex-row items-center justify-center text-center p-3 w-full max-w-[95%] mx-auto">
          </div>

          {getUserEventByUniqueKey?.isLoading ? (
            <div className="flex flex-col -mt-16 gap-3">
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  avatar
                  paragraph={{ rows: 1 }}
                  active
                  style={{
                    width: "250px",
                    margin: "10px 0",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="-mt-16 flex flex-col gap-8">
              <div className="flex items-start">
                {/* Image Section */}
                <div className="bg-OWANBE_PRY/20 p-2 max-h-[41px] min-w-[41px] rounded-xl flex-center justify-center">
                  <Image
                    src="/icons/calendar.svg"
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>

                {/* Text Section */}
                <div className="ml-2">
                  <div
                    className="text-sm"
                    style={{
                      fontWeight: 600,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Date
                  </div>
                  <div
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontWeight: 300,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {dateFormat(eventDetails?.startDate)} -{" "}
                    {dateFormat(eventDetails?.endDate)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
                  <Image src="/icons/time.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <div
                    className="text-sm"
                    style={{
                      fontWeight: 600,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Time
                  </div>
                  <div
                    style={{
                      fontWeight: 300,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {timeFormat(eventDetails?.startDate)} -{" "}
                    {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <Heading3
              className="text-lg font-bold mb-3"
              content={"About this event"}
            />
            <ReadMoreHTML
              htmlContent={eventDetails?.eventDetails || ""}
              maxLength={250}
            />

            <div className="flex justify-center mt-12">
              {eventDetails?.vendor_registration === true ? (
                <>
                    <Button
                      type={pathname.includes("register") ? "primary" : "text"}
                      className="primary-btn w-full "
                      style={{
                        borderRadius: "25px",
                        fontFamily: "BricolageGrotesqueMedium",
                        backgroundColor: isRegistrationClosed
                          ? "#cccccc"
                          : "#e20000", // Gray for disabled, red for active
                        color: isRegistrationClosed ? "#666666" : "white",
                        height: "50px", // Adjust height as needed
                        fontSize: "16px", // Increase text size
                        border: "none", // Remove border if needed
                      }}
                      title={isRegistrationClosed ? "Registration Closed" : ""}
                      disabled={isRegistrationClosed} // Disable button when registration is closed
                    >
                      <Space>
                        {eventDetails?.enable_registration === false
                          ? "Registration Closed"
                          : "Get Tickets"}
                        <IoChevronDown />
                      </Space>
                    </Button>
                </>
              ) : (
                <>
                  <Button
                    type={pathname.includes("register") ? "primary" : "text"}
                    onClick={() =>
                      router.push(`/${params?.event}/scanner`)
                    }
                    className="primary-btn w-full"
                    style={{
                      borderRadius: "25px",
                      fontFamily: "BricolageGrotesqueMedium",
                      backgroundColor: isRegistrationClosed
                        ? "#cccccc"
                        : "#e20000", // Gray for disabled, red for active
                      color: isRegistrationClosed ? "#666666" : "white",
                      height: "50px", // Adjust height as needed
                      fontSize: "16px", // Increase text size
                      border: "none", // Remove border if needed
                    }}
                    title={isRegistrationClosed ? "Registration Closed" : ""}
                    disabled={isRegistrationClosed} // Disable button when registration is closed
                  >
                    <Space>
                      {eventDetails?.enable_registration === false
                        ? "Registration Closed"
                        : "Scan Tickets"}
                    </Space>
                  </Button>
                </>
              )}
            </div>
          </div>

        </div>


      </section>
    </DashboardLayout>
  );
};

export default EventDetail;
