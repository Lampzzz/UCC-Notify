import { useState, useEffect } from "react";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import { fetchEvents } from "@Services/api/fetchEvents";
import SelectInput from "@Components/form/SelectInput";
import HoverButton from "@Components/button/HoverButton";
import Categories from "@Components/container/Categories";

const AllEvents = () => {
  const { events, isLoading } = fetchEvents();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState("Latest");

  // Get all the categories
  useEffect(() => {
    if (!isLoading) {
      const categorySet = new Set(events.map((event) => event.categories));

      setCategories(["All", ...Array.from(categorySet)]);
      setFilteredEvents(events);
    }
  }, [events]);

  // Show the selected categories
  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((event) =>
        event.categories.includes(selectedCategory)
      );
    }

    if (selectedStatus && selectedStatus !== "All") {
      filtered = filtered.filter((event) => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, selectedStatus]);

  // Sort the events
  useEffect(() => {
    let sortedEvents = [...filteredEvents];

    if (sortBy === "NameAscending") {
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "NameDescending") {
      sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Latest") {
      sortedEvents.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "Oldest") {
      sortedEvents.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    setFilteredEvents(sortedEvents);
  }, [sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <Container>
      <SectionContainer>
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
            id="statusSelect"
            label="Status"
            value={selectedStatus}
            options={[
              { value: "All", label: "All" },
              { value: "Upcoming", label: "Upcoming" },
              { value: "Ongoing", label: "Ongoing" },
              { value: "Done", label: "Done" },
            ]}
            onChange={handleStatusChange}
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
          {filteredEvents.map((event, index) => (
            <div
              className="col-3 card border-0 px-3 announcement__card"
              key={index}
            >
              <div className="position-relative">
                <img
                  src={`http://localhost:3000/image/${event.image}`}
                  alt={`Image ${index + 1}`}
                  className="card-img-top"
                />
                <div className="card__categories">
                  <Categories category={event.categories} />
                </div>
              </div>
              <div className="card-body px-0">
                <button className="btn p-0 text-start border-0">
                  <HoverButton>{event.title}</HoverButton>
                </button>
                <small>{event.createdAt}</small>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Container>
  );
};

export default AllEvents;
