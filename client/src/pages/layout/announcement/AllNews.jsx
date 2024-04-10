import { useState, useEffect } from "react";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import { fetchNews } from "@Services/api/fetchNews";
import SelectInput from "@Components/form/SelectInput";
import HoverButton from "@Components/button/HoverButton";
import Categories from "@Components/container/Categories";

const AllNews = () => {
  const { news, isLoading } = fetchNews();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredNews, setFilteredNews] = useState([]);
  const [sortBy, setSortBy] = useState("Latest");

  // Get all the categories
  useEffect(() => {
    if (!isLoading) {
      const categorySet = new Set(
        news.map((announcement) => announcement.categories)
      );

      setCategories(["All", ...Array.from(categorySet)]);
      setFilteredNews(news);
    }
  }, [news, isLoading]);

  // Show the seleted catagories
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      const filtered = news.filter((announcement) =>
        announcement.categories.includes(selectedCategory)
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
  }, [selectedCategory]);

  // Sort the news
  useEffect(() => {
    let sortedNews = [...filteredNews];

    if (sortBy === "NameAscending") {
      sortedNews.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "NameDescending") {
      sortedNews.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Latest") {
      sortedNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Oldest") {
      sortedNews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredNews(sortedNews);
  }, [sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <Container>
      <div className="container py-5">
        <div className="d-flex align-items-center mb-5">
          <SelectInput
            id="categorySelect"
            label="Category"
            value={selectedCategory}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={handleCategoryClick}
          />
          <SelectInput
            id="sortSelect"
            label="Sort"
            value={sortBy}
            options={[
              { value: "Latest", label: "Latest" },
              { value: "Oldest", label: "Oldest" },
              { value: "NameAscending", label: "Title (A to Z)" },
              { value: "NameDescending", label: "Title (Z to A)" },
            ]}
            onChange={handleSortChange}
          />
        </div>
        <div className="row">
          {filteredNews.map((announcement, index) => (
            <div
              className="col-3 card border-0 px-3 announcement__card"
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
                <button className="btn p-0 text-start border-0">
                  <HoverButton>{announcement.title}</HoverButton>
                </button>
                <small>{announcement.createdAt}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllNews;
