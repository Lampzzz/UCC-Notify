import { ANNOUNCEMENT_URL } from "../../../data/endpoint";
import { apiSlice } from "./apiSlice";

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCEMENT_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllAnnouncement: builder.query({
      query: () => ({
        url: `${ANNOUNCEMENT_URL}/data`,
        method: "GET",
      }),
    }),

    getAnnouncement: builder.query({
      query: (id) => ({
        url: `${ANNOUNCEMENT_URL}/data/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateAnnouncementMutation,
  useGetAllAnnouncementQuery,
  useGetAnnouncementQuery,
} = announcementApiSlice;
