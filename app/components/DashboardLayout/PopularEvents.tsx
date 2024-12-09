import EventSection from "./PopularEventSection";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import InfoCardM from "./OtherInfoCard2";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";

const PopularEvents = () => {
  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 5);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  console.log(discoveryEvents, "discoveryEvents");

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection
      title=""
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-semibold",
      }} // Inline style
      uri="/events/popularevents"
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
        // Once data is loaded, map through discoveryEvents and render InfoCard components
        discoveryEvents?.map((event: IEventDetails) => (
          <>
            <InfoCard
              className="lg:flex hidden"
              key={event?.id}
              title={event?.eventName}
              about={event?.eventType}
              
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/events/${event?.unique_key}`}
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
            <InfoCardM
              className="flex lg:hidden"
              key={event?.id}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/events/${event?.unique_key}`}
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

export default PopularEvents;
