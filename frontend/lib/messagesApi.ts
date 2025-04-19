import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Message = {
  id: number;
  content: string;
};

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => "/",
      providesTags: ["Messages"],
    }),

    addMessage: builder.mutation<Message, Partial<Message>>({
      query: (newMessage) => ({
        url: "/",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["Messages"],
    }),

    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),

    updateMessage: builder.mutation<Message, Partial<Message> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
