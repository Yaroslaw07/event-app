import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import { getFilteredEvents } from '@/helpers/api-util';
import ResultsTitle from '@/components/events/results-title';
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

function FilteredEventPage(props) {

    if (props.hasError) {
        return <p>Invalid filter. Please adjust your values!</p>
    }

    const filteredEvents = props.filteredEvents;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
          <>
            <ErrorAlert>
              <p>No events found for the chosen filter!</p>
                <Button link="/events">Show All Events</Button>
            </ErrorAlert>
          </>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents} />
        </>
    )
}

export async function getServerSideProps(context) {
    const {params} = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numMonth) ||
      isNaN(numYear) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return {
        props: {
          hasError: true,
        }, 
      }
    }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    return {
      props: {
        filteredEvents: filteredEvents,
        date: {
            year: numYear,
            month: numMonth,
        }
      },
    };
}

export default FilteredEventPage;