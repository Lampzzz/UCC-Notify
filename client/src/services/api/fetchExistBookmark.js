import { useEffect, useState } from "react";
import { useExistBookmarkQuery } from "@Services/redux/api/bookmarkApiSlice";

export const fetchExistBookmark = (userID, announcementID) => {
  const { data } = useExistBookmarkQuery({ userID, announcementID });
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    if (data) {
      setIsExist(data);
    }
  }, [data]);

  return { isExist };
};
