import OtherInfoCard from "./OtherInfoCard";
import { Skeleton } from "antd";
import EventSection from "./OtherEventSection";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { useParams, usePathname } from "next/navigation";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import InfoCardM from "./OtherInfoCard2";
import { useGetUserEventsCheck } from "@/app/hooks/checkin/checkin.hook";

const DiscoverEvents = () => {
  const params = useParams<{ userId: string }>();
  const { getUserEventsCheck } = useGetUserEventsCheck(params?.userId);
  const userEvents = getUserEventsCheck?.data?.data?.data?.data;
  // const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  // const filteredEvents = allEvents?.filter((event: any) => event?.createdAt )
  // const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  const isPending = getUserEventsCheck?.isLoading;

  return (
    <EventSection
      title="Your Available Events List"
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-medium",
      }} // Inline style
    >
      {isPending ? (
        <>
          {Array(5)
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
        userEvents?.map((event: IEventDetails, index: number) => (
          <>
            <InfoCardM
              className="flex lg:hidden"
              key={event?.id}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/${event?.unique_key}`}
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

export default DiscoverEvents;
