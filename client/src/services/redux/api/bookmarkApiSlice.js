import { BOOKMARK_URL } from "@Data/endpoint";
import { apiSlice } from "./apiSlice";

export const bookmarkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleBookmark: builder.mutation({
      query: (data) => ({
        url: `${BOOKMARK_URL}/toggle`,
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

    getBookmark: builder.query({
      query: (userID) => ({
        url: `${BOOKMARK_URL}/get/${userID}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useToggleBookmarkMutation,
  useExistBookmarkQuery,
  useGetBookmarkQuery,
} = bookmarkApiSlice;
