import { useEffect, useState } from "react";
import { useGetAnnouncementQuery } from "@Services/redux/api/announcementApiSlice";

export const fetchCurrentAnnouncement = (id) => {
  const { data, refetch, isLoading } = useGetAnnouncementQuery(id);
  const [announcement, setAnnouncement] = useState({});

  useEffect(() => {
    if (data) {
      setAnnouncement(data);
    }
  }, [data]);

  return { announcement, refetch, isLoading };
};
