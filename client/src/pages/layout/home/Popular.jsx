import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import Categories from "@Components/container/Categories";
import Slick from "@Components/slick/Slick";
import SectionContainer from "@Components/container/SectionContainer";
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
      <div className="container py-5">
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
          <p>Loading...</p>
        ) : (
          <Slick data={filteredAnnouncements} no={4} dots={true} col={"col-3"}>
            {filteredAnnouncements.map((announcement, index) => (
              <div
                className="card border-0 px-3 announcement__card"
                key={index}
              >
                <div className="position-relative">
                  <img
                    src={`http://localhost:3000/image/${announcement.image}`}
                    alt={`Image ${index + 1}`}
                    className="card-img-top"
                  />
                  <div className="card__categories">
                    <Categories category={announcement.categories} />
                  </div>
                </div>
                <div className="card-body px-0">
                  <DateFormat
                    style={"text-black-50"}
                    date={announcement.createdAt}
                  />
                  <ContentButton onClick={() => hadleContent(announcement._id)}>
                    <p>{announcement.title}</p>
                  </ContentButton>
                </div>
              </div>
            ))}
          </Slick>
        )}
      </div>
    </>
  );
};

export default Popular;
