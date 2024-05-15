import { COMMENT_URL } from "@Data/endpoint";
import { apiSlice } from "./apiSlice";

export const bookmarkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),

    getComment: builder.query({
      query: (announcementID) => ({
        url: `${COMMENT_URL}/get/${announcementID}`,
        method: "GET",
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ userID, announcementID }) => ({
        url: `${COMMENT_URL}/delete/${userID}/${announcementID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
} = bookmarkApiSlice;
