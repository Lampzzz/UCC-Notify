import Categories from "@Components/container/Categories";
import SectionContainer from "@Components/container/SectionContainer";
import TitleContainer from "@Components/container/TitleContainer";
import Slick from "@Components/slick/Slick";
import { fetchNews } from "@Services/api/fetchNews";

const Weekly = () => {
  const { news, isLoading } = fetchNews();

  return (
    <>
      <SectionContainer>
        <div className="d-flex justify-content-between mb-3">
          <TitleContainer>Weekly Top News</TitleContainer>
          {news.length > 4 && <p className="mb-0">see more</p>}
        </div>
        {isLoading ? (
          <p className="fs-1">Loading...</p>
        ) : (
          <Slick data={news} no={3} col={"col-4"}>
            {news.map((announcement, index) => (
              <div className="announcement__container px-3" key={index}>
                <img
                  src={`http://localhost:3000/image/${announcement.image}`}
                  alt={`Image ${index + 1}`}
                  className="img-fluid mb-3 rounded-3 announcement__image"
                />
                <div className="announcement__detail rounded-3">
                  <Categories category={announcement.categories} />
                  <p className="mt-3 mb-0 link__content">
                    {announcement.title}
                  </p>
                  <small>{announcement.createdAt}</small>
                </div>
              </div>
            ))}
          </Slick>
        )}
      </SectionContainer>
    </>
  );
};

export default Weekly;
