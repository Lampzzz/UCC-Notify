import { useNavigate } from "react-router-dom";
import { fetchNews } from "@Services/api/fetchNews";
import TitleContainer from "@Components/container/TitleContainer";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";
import Slick from "@Components/slick/Slick";

const LatestNews = () => {
  const navigate = useNavigate();
  const { news, isLoading } = fetchNews();

  const handleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="container py-5" id="section">
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Latest News</TitleContainer>
        {news.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && news ? (
        <div className="row">
          <Slick no={4}>
            {news.slice(0, 4).map((announcement, index) => (
              <div className="col px-2" key={index}>
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
          <p className="fs-5">There is no news available</p>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
