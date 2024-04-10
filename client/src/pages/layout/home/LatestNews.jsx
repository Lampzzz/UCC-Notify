import { useNavigate } from "react-router-dom";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import { fetchNews } from "@Services/api/fetchNews";
import Categories from "@Components/container/Categories";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";

const LatestNews = () => {
  const navigate = useNavigate();
  const { news, isLoading } = fetchNews();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <SectionContainer>
      <div className="d-flex justify-content-between mb-3">
        <TitleContainer>Latest News</TitleContainer>
        {news.length > 4 && <p className="mb-0">see more</p>}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Slick data={news} no={4}>
          {news.map((announcement, index) => (
            <div className="card border-0 px-3 announcement__card" key={index}>
              <div className="position-relative">
                <img
                  src={`http://localhost:3000/image/${announcement.image}`}
                  alt={announcement.title}
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

export default LatestNews;
