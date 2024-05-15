import { useGetCommentQuery } from "@Services/redux/api/commentApiSlice";
import { useEffect, useState } from "react";

export const fetchComments = (announcementID) => {
  const { data, refetch, isLoading } = useGetCommentQuery(announcementID);
  const [comments, setComments] = useState([]);

  console.log(`Comments: ${data}`);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data, refetch]);

  return { comments, refetch, isLoading };
};
