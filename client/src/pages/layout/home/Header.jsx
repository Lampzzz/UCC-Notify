import { useNavigate } from "react-router-dom";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import Categories from "@Components/container/Categories";
import Trending from "@Components/container/Trending";
import { imagePath } from "@Data/imagepath";

const Header = () => {
  const navigate = useNavigate();
  const { announcements } = fetchAllAnnouncement();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  const announcementSubHeader = () =>
    announcements.slice(3, 6).map((announcement, index) => (
      <div className="col-12" key={index}>
        <div className="row">
          <div className="d-flex align-items-center gap-3">
            <div className="col-5">
              <img
                src={imagePath(announcement.image)}
                className="img-fluid rounded-3 "
                alt="Announcement Image"
              />
            </div>
            <div className="col-7">
              <Categories category={announcement.categories} />
              <div className="mt-3 d-flex flex-column row-gap-2 header__content--subtext">
                <ContentButton onClick={() => hadleContent(announcement._id)}>
                  <small>{announcement.title}</small>
                </ContentButton>
                <DateFormat
                  style={"text-black-50"}
                  date={announcement.createdAt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="my-5">
      <Trending />
      <div className="row">
        <div className="col-12 col-md-8 mb-3 mb-md-0">
          {announcements.length > 0 && announcements[0].image && (
            <div className="position-relative">
              <img
                src={imagePath(announcements[0].image)}
                className="header__img rounded-3"
                alt={announcements[0].title}
              />
              <div className="header__content">
                <Categories category={announcements[0].categories} />
                <ContentButton
                  onClick={() => hadleContent(announcements[0]._id)}
                >
                  <p className="my-2 fs-2 fw-bold header__content--text ">
                    {announcements[0].title}
                  </p>
                </ContentButton>
                <DateFormat
                  style={"text-white"}
                  date={announcements[0].createdAt}
                />
              </div>
            </div>
          )}
        </div>
        <div className="col-12 col-md-4">
          <div className="row row-gap-3 ">{announcementSubHeader()}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
