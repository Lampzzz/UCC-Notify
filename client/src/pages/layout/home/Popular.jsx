import { useState, useEffect } from "react";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import Slick from "@Components/slick/Slick";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";
import TitleContainer from "@Components/container/TitleContainer";

const Popular = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();

  return (
    <>
      <div className="container-fluid p-5">
        <div className="d-flex align-items-center mb-4">
          <TitleContainer>Most Popular</TitleContainer>
        </div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="row">
            <Slick no={4}>
              {announcements.map((announcement, index) => (
                <div className="col px-2" key={index}>
                  <AnnouncementCard
                    index={announcement._id}
                    announcement={announcement}
                  />
                </div>
              ))}
            </Slick>
          </div>
        )}
      </div>
    </>
  );
};

export default Popular;
