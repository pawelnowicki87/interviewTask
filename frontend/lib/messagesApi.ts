// lib/messagesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Message = {
  id: number;
  content: string;
};

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080", // zmień na backend_api:8080 jeśli frontend działa w kontenerze
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    // 1. Pobierz wszystkie wiadomości
    getMessages: builder.query<Message[], void>({
      query: () => "/",
      providesTags: ["Messages"],
    }),

    // 2. Dodaj nową wiadomość
    addMessage: builder.mutation<Message, Partial<Message>>({
      query: (newMessage) => ({
        url: "/",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["Messages"],
    }),

    // 3. Usuń wiadomość
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),

    // 4. Edytuj wiadomość
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
