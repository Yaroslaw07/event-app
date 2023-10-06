import { Fragment } from "react";
import { useRouter } from "next/router";

import { getEventById } from "@/data/dummy_data";
import EventContent from "@/components/events/event-content";
import EventSummary from "@/components/events/event-summary";
import EventLogistics from "@/components/events/event-logistics";


function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.date}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;
