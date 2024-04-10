import { useState, useEffect } from "react";
import { fetchAllAnnouncement } from "@Services/api/fetchAllAnnouncement";

export const fetchNews = () => {
  const { announcements, isLoading } = fetchAllAnnouncement();
  const [news, setNews] = useState([]);

  useEffect(() => {
    filterNews();
  }, [announcements]);

  const filterNews = () => {
    const newsOnly = announcements.filter(
      (announcement) => announcement.types === "News"
    );
    setNews(newsOnly);
  };

  return { news, isLoading };
};
