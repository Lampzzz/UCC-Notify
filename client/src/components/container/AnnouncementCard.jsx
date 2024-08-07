import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import Categories from "@Components/container/Categories";

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="card border-0 announcement__card">
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
        <DateFormat date={announcement.createdAt} />
        <ContentButton id={announcement._id}>
          <p>{announcement.title}</p>
        </ContentButton>
      </div>
    </div>
  );
};

export default AnnouncementCard;
