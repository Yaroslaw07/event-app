
import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-util";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import Head from "next/head";

function HomePage(props) {

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events:featuredEvents
    },
    revalidate: 1200
  }
}

export default HomePage;