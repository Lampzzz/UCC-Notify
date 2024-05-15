import { useEffect, useState } from "react";
import { useGetAllAnnouncementQuery } from "../redux/api/announcementApiSlice";

export const fetchAllAnnouncement = () => {
  const { data, refetch, isLoading } = useGetAllAnnouncementQuery();
  const [announcements, setAnnouncements] = useState([]);

  // console.log(data);

  useEffect(() => {
    refetch();
    if (data) {
      setAnnouncements(data);
    }
  }, [data, refetch]);

  return { announcements, refetch, isLoading };
};
