import { useState, useEffect } from "react";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";

export const fetchEvents = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    filterEvents();
  }, [announcements]);

  const filterEvents = () => {
    const eventsOnly = announcements.filter(
      (announcement) => announcement.types === "Events"
    );
    setEvents(eventsOnly);
  };

  return { events, isLoading };
};
