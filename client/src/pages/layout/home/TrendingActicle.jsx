import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import HoverButton from "@Components/button/HoverButton";

const TrendingActicle = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const mostPopular = announcements.slice(0, 3);

  return (
    <div className="mb-5">
      <h4>Trending</h4>
      <hr />
      {mostPopular.map((popular, index) => (
        <div className="row mb-3 align-items-center " key={index}>
          <div className="col-5">
            <img
              src={`http://localhost:3000/image/${popular.image}`}
              className="img-fluid rounded-3 "
              alt={popular.title}
            />
          </div>
          <div className="col-7">
            <HoverButton>{popular.title}</HoverButton>
            <small>{popular.createdAt}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingActicle;
