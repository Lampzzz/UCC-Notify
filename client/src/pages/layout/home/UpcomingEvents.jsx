import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "@Services/api/fetchEvents";
import Categories from "@Components/container/Categories";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const { events, isLoading } = fetchEvents();
  const [filterEvents, setFilterEvents] = useState([]);

  useEffect(() => {
    const upcomingEvents = events.filter((event) => event.status !== "Done");
    setFilterEvents(upcomingEvents);
  }, [events]);

  const handleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Upcoming / Ongoing Events</TitleContainer>
        {events.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && filterEvents.length > 0 ? (
        <div className="row">
          <Slick no={filterEvents.length}>
            {events.map((announcement, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 px-2"
                key={index}
              >
                <AnnouncementCard
                  index={announcement._id}
                  announcement={announcement}
                  handleClick={() => handleContent(announcement._id)}
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
