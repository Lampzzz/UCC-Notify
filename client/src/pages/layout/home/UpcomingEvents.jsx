import { useNavigate } from "react-router-dom";
import { fetchEvents } from "@Services/api/fetchEvents";
import Categories from "@Components/container/Categories";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";

const UpcomingEvents = () => {
  const { events, isLoading } = fetchEvents();
  const navigate = useNavigate();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <SectionContainer>
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Upcoming / Ongoing Events</TitleContainer>
        {events.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </SectionContainer>
  );
};

export default UpcomingEvents;
