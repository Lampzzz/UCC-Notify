import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DateFormat from "@Components/container/DateFormat";
import ContentButton from "@Components/button/ContentButton";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import SelectInput from "@Components/form/SelectInput";
import Categories from "@Components/container/Categories";

const Search = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const navigate = useNavigate();

  const hadleContent = (id) => {
    navigate(`/content/${id}`);
  };

  // Filter announcements based on search input
  useEffect(() => {
    const filteredAnnouncements = announcements.filter((announcement) =>
      announcement.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredAnnouncements);
  }, [announcements, search]);

  // Get all the categories
  useEffect(() => {
    if (!isLoading) {
      const categorySet = new Set(
        announcements.map((announcement) => announcement.categories)
      );

      setCategories(["All", ...Array.from(categorySet)]);
      setSearchResult(announcements);
    }
  }, [announcements, isLoading]);

  // Show the seleted catagories
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      const filtered = announcements.filter((announcement) =>
        announcement.categories.includes(selectedCategory)
      );
      setSearchResult(filtered);
    } else {
      setSearchResult(announcements);
    }
  }, [selectedCategory]);

  // Sort the  announcement
  useEffect(() => {
    let sortedAnnouncement = [...searchResult];

    if (sortBy === "NameAscending") {
      sortedAnnouncement.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "NameDescending") {
      sortedAnnouncement.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Latest") {
      sortedAnnouncement.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "Oldest") {
      sortedAnnouncement.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    setSearchResult(sortedAnnouncement);
  }, [sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <Container>
      <div className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-end my-5">
          <div className="mb-3 mb-lg-0">
            <h2>Search</h2>
            <p className="mb-0">Effortlessly find news and events for you</p>
          </div>
          {announcements.length > 0 ? (
            <div className="position-relative">
              <input
                type="text"
                className="form-control py-2 bg-transparent border-2 shadow-none "
                placeholder="Search "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bg-transparent bg-white search__icon">
                <CiSearch className="text-black-50" size={25} />
              </div>
            </div>
          ) : null}
        </div>
        <div className="d-flex align-items-center my-5">
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
          {searchResult.map((announcement, index) => (
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
        </div>
      </div>
    </Container>
  );
};

export default Search;
