import EventSection from "./UpcomingEventSection";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { useGetUserEventsCheck } from "@/app/hooks/checkin/checkin.hook";
import { Skeleton } from "antd";
import InfoCardM from "./OtherInfoCard2";
import { useParams } from "next/navigation";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import { useState } from "react";

const UpcomingEvents = () => {
  const params = useParams<{ userId: string }>();
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const { getUserEventsCheck } = useGetUserEventsCheck(params?.userId);
  const userEvents = getUserEventsCheck?.data?.data?.data?.data;
  const filteredEvents = userEvents?.filter((event: IEventDetails) => new Date(event.startDate).getTime() > new Date().getTime());
  const isPending = getUserEventsCheck?.isLoading;

  return (
    <EventSection
      titleClass="custom-title-class"
      style={{
        fontSize: "20px", 
        fontFamily: "Bricolage Grotesque, font-semibold",
      }} // Inline style
      uri="/discover/popularevents"
    >
      {isPending ? (
        <>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="round"
                style={{
                  height: 200,
                  width: 200,
                  margin: "10px",
                  maxWidth: "100%",
                }}
              />
            ))}
        </>
      ) : (
        // Once data is loaded, map through discoveryEvents and render InfoCard components
        filteredEvents?.map((event: IEventDetails, index: number) => (
          <>
            <InfoCardM
              className="flex lg:hidden"
              key={index}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/discover/${event?.unique_key}`}
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
          </>
        ))
      )}
    </EventSection>
  );
};

export default UpcomingEvents;
