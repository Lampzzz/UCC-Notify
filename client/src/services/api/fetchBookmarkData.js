import { useEffect, useState } from "react";
import { useGetBookmarkQuery } from "@Services/redux/api/bookmarkApiSlice";

export const fetchBookmarkData = (userID) => {
  const { data, refetch, isLoading } = useGetBookmarkQuery(userID);
  const [bookmarkData, setBookmarkData] = useState([]);

  useEffect(() => {
    if (data) {
      setBookmarkData(data);
    }
  }, [data, refetch]);

  return { bookmarkData, refetch, isLoading };
};
