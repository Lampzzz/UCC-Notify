import { fetchNews } from "@Services/api/fetchNews";
import Categories from "@Components/container/Categories";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";

const Weekly = () => {
  const { news, isLoading } = fetchNews();

  return (
    <>
      <div className="container-fluid bg-light" id="section">
        <div className="container">
          <div className="d-flex justify-content-between mb-3">
            <TitleContainer>Weekly Top News</TitleContainer>
            {news.length > 4 && <p className="mb-0">see more</p>}
          </div>
          {isLoading ? (
            <p className="fs-1">Loading...</p>
          ) : (
            <div className="row">
              {news.slice(0, 3).map((announcement, index) => (
                <div className="col-4 announcement__container" key={index}>
                  <img
                    src={`http://localhost:3000/image/${announcement.image}`}
                    alt={`Image ${index + 1}`}
                    className="img-fluid mb-3 rounded-3 announcement__image"
                  />
                  <div className="announcement__detail rounded-3">
                    <div className="mb-2">
                      <Categories category={announcement.categories} />
                    </div>
                    <ContentButton
                      onClick={() => hadleContent(announcement._id)}
                    >
                      <p>{announcement.title}</p>
                    </ContentButton>
                    <DateFormat
                      style={"text-black-50"}
                      date={announcement.createdAt}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weekly;
