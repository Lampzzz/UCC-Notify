import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";

const Trending = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const [titles, setTitles] = useState(["No announcements available"]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && announcements) {
      const latestAnnouncements = announcements.slice(0, 5);
      const latestTitles = latestAnnouncements.map(
        (announcement) => announcement.title
      );
      setTitles(latestTitles);
      setDataLoaded(true);
    }
  }, [announcements, isLoading]);

  return (
    <div className="d-flex align-items-center mb-3">
      <span className="px-3 py-2 rounded-3 me-3 text-white main--baground">
        Trending Now
      </span>
      {isLoading ? (
        <span>Loading...</span>
      ) : dataLoaded && titles.length > 0 ? (
        <TypeAnimation
          sequence={[
            titles[0],
            1000,
            titles[1],
            1000,
            titles[2],
            1000,
            titles[3],
            1000,
            titles[4],
            1000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "1em", display: "inline-block" }}
        />
      ) : null}
    </div>
  );
};

export default Trending;
