import { useState, useEffect } from "react";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import ProfileButton from "@Components/button/ProfileButton";

const UserBookmark = () => {
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
      </div>
    </Container>
  );
};

export default UserBookmark;
