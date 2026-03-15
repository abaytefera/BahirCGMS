import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_AI = import.meta.env.VITE_API_AI;
// Ensure this matches your .env variable name (e.g., VITE_COMPANY_ID)
const COMPANY_ID = import.meta.env.VITE_COMPANY_ID; 

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_AI }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
   // ... in your chatApi.js

getChatHistory: builder.query({
  // We change the query to return an object instead of a string
  query: (sessionId) => ({
    url: `/chat/history/${sessionId}`,
    method: 'GET',
    params: { 
    
      company_id: COMPANY_ID
    },
  }),
  transformResponse: (response) => (Array.isArray(response) ? response : []),
  providesTags: (result, error, sessionId) => [{ type: "Messages", id: sessionId }],
}),

    sendMessage: builder.mutation({
  query: (payload) => ({
    url: "/chat",
    method: "POST",
    body: { 
      // Ensure all fields expected by ChatRequest are here
      session_id: payload.session_id,
      message: payload.message,
      type: payload.type || 'text',
      top_k: payload.top_k || 5,
      // Pass the company_id here
      company_id: import.meta.env.VITE_COMPANY_ID 
    },
  }),
      async onQueryStarted({ session_id, message }, { dispatch, queryFulfilled }) {
        // OPTIMISTIC UPDATE: Add user message immediately
        const patchResult = dispatch(
          chatApi.util.updateQueryData("getChatHistory", session_id, (draft) => {
            if (Array.isArray(draft)) {
              draft.push({ role: "visitor", text: message });
            }
          })
        );
        try {
          const { data } = await queryFulfilled;
          // SUCCESS: Add AI response
          dispatch(
            chatApi.util.updateQueryData("getChatHistory", session_id, (draft) => {
              if (Array.isArray(draft)) {
                draft.push({ 
                  role: "assistant", 
                  text: data.answer,
                  audio: data.audio_url // Added to match history format
                });
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetChatHistoryQuery, useSendMessageMutation } = chatApi;