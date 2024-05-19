import { fetchNews } from "@Services/api/fetchNews";
import Categories from "@Components/container/Categories";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";

const Weekly = () => {
  const { news, isLoading } = fetchNews();

  return (
    <>
      <div className="container-fluid p-5 bg-light">
        <div className="d-flex justify-content-between mb-3">
          <TitleContainer>Weekly Top News</TitleContainer>
          {news.length > 4 && <p className="mb-0">see more</p>}
        </div>
        {isLoading ? (
          <p className="fs-1">Loading...</p>
        ) : (
          <div className="row">
            <Slick no={3}>
              {news.map((announcement, index) => (
                <div className="col px-2 announcement__container" key={index}>
                  <img
                    src={`http://localhost:3000/image/${announcement.image}`}
                    alt={`Image ${index + 1}`}
                    className="img-fluid mb-3 rounded-3 announcement__image "
                  />
                  <div className="rounded-3 announcement__detail">
                    <div className="mb-2">
                      <Categories category={announcement.categories} />
                    </div>
                    <ContentButton id={announcement._id}>
                      <p>{announcement.title}</p>
                    </ContentButton>
                    <DateFormat isDark={true} date={announcement.createdAt} />
                  </div>
                </div>
              ))}
            </Slick>
          </div>
        )}
      </div>
    </>
  );
};

export default Weekly;
