import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import Categories from "@Components/container/Categories";
import Slick from "@Components/slick/Slick";
import LoadingSkeleton from "@Components/loading/LoadingSkeleton";
import AnnouncementCard from "@Components/container/AnnouncementCard";
import TitleContainer from "@Components/container/TitleContainer";

const Popular = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const navigate = useNavigate();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  useEffect(() => {
    if (!isLoading) {
      const categorySet = new Set(
        announcements.map((announcement) => announcement.categories)
      );

      setCategories(["All", ...Array.from(categorySet)]);
      setFilteredAnnouncements(announcements);
    }
  }, [announcements, isLoading]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      const filtered = announcements.filter((announcement) =>
        announcement.categories.includes(selectedCategory)
      );
      setFilteredAnnouncements(filtered);
    } else {
      setFilteredAnnouncements(announcements);
    }
  }, [selectedCategory, announcements]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="container" id="section">
        <div className="d-flex align-items-center mb-4">
          <TitleContainer>Most Popular</TitleContainer>
          <div className="d-flex ms-5">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`btn border-0 bg-light px-4 py-2 ${
                  selectedCategory === category ? "active__category " : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="row">
            {filteredAnnouncements.map((announcement, index) => (
              <div className="col-3" key={index}>
                <AnnouncementCard
                  index={announcement._id}
                  announcement={announcement}
                  handleClick={() => hadleContent(announcement._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Popular;
