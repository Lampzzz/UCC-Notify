import { BOOKMARK_URL } from "@Data/endpoint";
import { apiSlice } from "./apiSlice";

export const bookmarkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteBookmark: builder.mutation({
      query: ({ userID, announcementID }) => ({
        url: `${BOOKMARK_URL}/remove/${userID}/${announcementID}`,
        method: "DELETE",
      }),
    }),

    addBookmark: builder.mutation({
      query: (data) => ({
        url: `${BOOKMARK_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),

    existBookmark: builder.query({
      query: ({ userID, announcementID }) => ({
        url: `${BOOKMARK_URL}/check/${userID}/${announcementID}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useExistBookmarkQuery,
} = bookmarkApiSlice;
