import { useNavigate } from "react-router-dom";
import { fetchNews } from "@Services/api/fetchNews";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";

const LatestNews = () => {
  const navigate = useNavigate();
  const { news, isLoading } = fetchNews();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Latest News</TitleContainer>
        {news.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : !isLoading && news ? (
        <Slick data={news} no={4}>
          {news.map((announcement, index) => (
            <AnnouncementCard
              index={announcement._id}
              announcement={announcement}
              handleClick={() => hadleContent(announcement._id)}
            />
          ))}
        </Slick>
      ) : (
        <div className="text-center my-5">
          <p className="fs-5">There is no news available</p>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
