import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";

const TrendingActicle = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const mostPopular = announcements.slice(0, 3);

  return (
    <>
      <h5>Trending</h5>
      <hr />
      {mostPopular.map((announcement, index) => (
        <div className="row mb-3 align-items-center " key={index}>
          <div className="col-5">
            <img
              src={`http://localhost:3000/image/${announcement.image}`}
              className="img-fluid rounded-3 "
              alt={announcement.title}
            />
          </div>
          <div className="col-7">
            <ContentButton onClick={() => hadleContent(announcement._id)}>
              <p>{announcement.title}</p>
            </ContentButton>
            <DateFormat style={"text-black-50"} date={announcement.createdAt} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TrendingActicle;
