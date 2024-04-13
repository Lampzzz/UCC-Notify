import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import { useGetAnnouncementQuery } from "@Services/redux/api/announcementApiSlice";
import Container from "@Components/container/Container";
import Trending from "@Components/container/Trending";
import RequiredModal from "@Components/modal/RequiredModal";
import OpenModalButton from "@Components/button/OpenModalButton";
import TrendingActicle from "./TrendingActicle";
import Comment from "./Comment";

const Content = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAnnouncementQuery(id);
  const { userInfo } = fetchUserDetail();
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(<FaRegBookmark size={30} />);
  const [announcement, setAnnouncement] = useState();

  // Get the announcement
  useEffect(() => {
    if (data) {
      setAnnouncement(data);
    }
  }, [data]);

  // Bookmark the announcement
  const handleBookmark = () => {
    setBookmark(!bookmark);
    setBookmarkIcon(
      bookmark ? <FaRegBookmark size={30} /> : <FaBookmark size={30} />
    );

    if (bookmark) {
      toast.error("Bookmark Removed");
    } else {
      toast.success("Bookmark Added");
    }
  };

  return (
    <Container>
      <div className="container mt-5">
        <Trending />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="row mb-5">
              <div className="col-12 col-md-8">
                {announcement && (
                  <>
                    <div className="bookmark__container">
                      <img
                        src={`http://localhost:3000/image/${announcement.image}`}
                        className="header__img rounded-3"
                        alt={announcement.title}
                      />
                      <div className="bookmark__icon">
                        {userInfo ? (
                          <button
                            className="btn main--color border-0 "
                            onClick={handleBookmark}
                          >
                            {bookmarkIcon}
                          </button>
                        ) : (
                          <OpenModalButton
                            target={"loginRequiredModal"}
                            style={"main--color"}
                          >
                            {bookmarkIcon}
                          </OpenModalButton>
                        )}
                      </div>
                    </div>
                    <h4 className="fw-semibold mt-4 mb-3">
                      {announcement.title}
                    </h4>
                    <p className="mb-5 text-black-50">{announcement.content}</p>
                  </>
                )}
              </div>
              <div className="col-12 col-md-4">
                <TrendingActicle />
                <Comment user={userInfo} />
              </div>
            </div>
          </>
        )}
      </div>
      <RequiredModal />
    </Container>
  );
};

export default Content;
