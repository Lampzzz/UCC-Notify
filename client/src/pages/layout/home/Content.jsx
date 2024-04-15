import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import { fetchCurrentAnnouncement } from "@Services/api/fetchCurrentAnnouncement";
import { fetchExistBookmark } from "@Services/api/fetchExistBookmark";
import Container from "@Components/container/Container";
import Trending from "@Components/container/Trending";
import RequiredModal from "@Components/modal/RequiredModal";
import OpenModalButton from "@Components/button/OpenModalButton";
import TrendingActicle from "./TrendingActicle";
import Comment from "./Comment";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} from "@Services/redux/api/bookmarkApiSlice";

const Content = () => {
  const { id } = useParams();
  const { userInfo } = fetchUserDetail();
  const { announcement, isLoading } = fetchCurrentAnnouncement(id);
  const { isExist } = fetchExistBookmark(userInfo._id, id);
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const [isBookmark, setIsBookmark] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(<FaRegBookmark size={30} />);

  useEffect(() => {
    setBookmarkIcon(
      isExist ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />
    );
    setIsBookmark(isExist);
  }, [isExist]);

  // Bookmark the announcement
  const handleBookmark = async (announcementID) => {
    const userID = userInfo._id;

    setBookmarkIcon(
      isBookmark ? <FaRegBookmark size={30} /> : <FaBookmark size={30} />
    );

    try {
      if (isBookmark) {
        await deleteBookmark({ userID, announcementID }).unwrap();
        setIsBookmark(false);
      } else {
        await addBookmark({ userID, announcementID }).unwrap();
        toast.success("Bookmark Added");
        setIsBookmark(true);
      }
    } catch (err) {
      console.error("Error Message: ", err.message);
      toast.error("Bookmark Removed");
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
                            onClick={() => handleBookmark(announcement._id)}
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
