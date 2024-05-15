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
  }),
});

export const { useCreateCommentMutation, useGetCommentQuery } =
  bookmarkApiSlice;
