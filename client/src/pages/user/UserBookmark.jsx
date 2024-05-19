import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import ProfileButton from "@Components/button/ProfileButton";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import { fetchBookmarkData } from "@Services/api/fetchBookmarkData";
import AnnouncementCard from "@Components/container/AnnouncementCard";

const UserBookmark = () => {
  const { userInfo } = fetchUserDetail();
  const navigate = useNavigate();
  const { bookmarkData } = fetchBookmarkData(userInfo._id);

  const handleContent = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <Container>
      <div className="container">
        <div className="my-5">
          <h2>Bookmark</h2>
          <p className="mb-0">Set your account settings down below</p>
        </div>
        <div className="text-center mb-5 d-flex justify-content-center">
          <ProfileButton to="/user/profile" label="Profile" />
          <ProfileButton to="/user/bookmark" label="Bookmark" />
        </div>
        <div className="row">
          {bookmarkData.map((bookmark, index) => (
            <div className="col-3" key={bookmark.announcement._id}>
              <AnnouncementCard
                index={index}
                announcement={bookmark.announcement}
                handleClick={() => handleContent(bookmark.announcement._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UserBookmark;
