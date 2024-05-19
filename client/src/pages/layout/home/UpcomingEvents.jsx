import { useState, useEffect } from "react";
import { fetchEvents } from "@Services/api/fetchEvents";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";

const UpcomingEvents = () => {
  const { events, isLoading } = fetchEvents();
  const [filterEvents, setFilterEvents] = useState([]);

  useEffect(() => {
    const upcomingEvents = events.filter((event) => event.status !== "Done");
    setFilterEvents(upcomingEvents);
  }, [events]);

  return (
    <div className="container-fluid p-5">
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Upcoming / Ongoing Events</TitleContainer>
        {events.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && filterEvents.length > 0 ? (
        <div className="row">
          <Slick no={4}>
            {events.map((announcement, index) => (
              <div className="col px-2" key={index}>
                <AnnouncementCard
                  index={announcement._id}
                  announcement={announcement}
                />
              </div>
            ))}
          </Slick>
        </div>
      ) : (
        <div className="text-center my-5">
          <p className="fs-5 text-black-50">
            There is no upcoming or ongoing events
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
