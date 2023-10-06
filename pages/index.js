
import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/data/dummy_data";
import { useEffect } from 'react';

function HomePage() {

  let featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;