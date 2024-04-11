import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import { useGetAnnouncementQuery } from "@Services/redux/api/announcementApiSlice";
import Container from "@Components/container/Container";
import Trending from "@Components/container/Trending";
import RequiredModal from "@Components/modal/RequiredModal";
import TrendingActicle from "./TrendingActicle";
import Comment from "./Comment";

const Content = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAnnouncementQuery(id);
  const { user } = fetchUserDetail();
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(<FaRegBookmark size={30} />);
  const [announcement, setAnnouncement] = useState();
  const [showModal, setShowModal] = useState(false);

  // Get the announcement
  useEffect(() => {
    if (data) {
      setAnnouncement(data);
    }
  }, [data]);

  const handleBookmark = () => {
    if (user) {
      setBookmark(!bookmark);
      setBookmarkIcon(
        bookmark ? <FaRegBookmark size={30} /> : <FaBookmark size={30} />
      );
      if (bookmark) {
        toast.error("Bookmark Removed");
      } else {
        toast.success("Bookmark Added");
      }
    } else {
      setShowModal(true);
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
                        <button
                          className="btn main--color border-0 "
                          onClick={handleBookmark}
                        >
                          {bookmarkIcon}
                        </button>
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
                <Comment />
              </div>
            </div>
          </>
        )}
      </div>
      {showModal && <RequiredModal id="loginRequiredModal" />}
    </Container>
  );
};

export default Content;
