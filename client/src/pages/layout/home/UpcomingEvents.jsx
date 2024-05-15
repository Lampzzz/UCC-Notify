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

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const { events, isLoading } = fetchEvents();
  const [filterEvents, setFilterEvents] = useState([]);

  useEffect(() => {
    const upcomingEvents = events.filter((event) => event.status !== "Done");
    setFilterEvents(upcomingEvents);
  }, [events]);

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="container" id="section">
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Upcoming / Ongoing Events</TitleContainer>
        {events.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && filterEvents.length > 0 ? (
        <Slick data={events} no={4}>
          {events.map((announcement, index) => (
            <div className="card border-0 px-3 announcement__card" key={index}>
              <div className="position-relative">
                <img
                  src={`http://localhost:3000/image/${announcement.image}`}
                  alt={`Image ${index + 1}`}
                  className="card-img-top"
                />
                <div className="card__categories">
                  <Categories category={announcement.categories} />
                </div>
              </div>
              <div className="card-body px-0">
                <DateFormat
                  style={"text-black-50"}
                  date={announcement.createdAt}
                />
                <ContentButton onClick={() => hadleContent(announcement._id)}>
                  <p>{announcement.title}</p>
                </ContentButton>
              </div>
            </div>
          ))}
        </Slick>
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
