import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_AI = import.meta.env.VITE_API_AI;
const COMPANY_ID = import.meta.env.VITE_COMPANY_ID; 

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_AI }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({

    getChatHistory: builder.query({
      query: (sessionId) => ({
        url: `/chat/history/${sessionId}`,
        method: 'GET',
        params: { company_id: COMPANY_ID },
      }),
      transformResponse: (response) => (Array.isArray(response) ? response : []),
      // እያንዳንዱን ሴሽን ለይቶ ለማወቅ id እንሰጠዋለን
      providesTags: (result, error, sessionId) => [{ type: "Messages", id: sessionId }],
    }),

    sendMessage: builder.mutation({
      query: (payload) => ({
        url: "/chat",
        method: "POST",
        body: { 
          session_id: payload.session_id,
          message: payload.message,
          type: payload.type || 'text',
          top_k: payload.top_k || 5,
          company_id: COMPANY_ID 
        },
      }),
     

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const { session_id, message } = payload;

        
        const patchResult = dispatch(
          chatApi.util.updateQueryData("getChatHistory", session_id, (draft) => {
            if (Array.isArray(draft)) {
              draft.push({ 
                role: "visitor", 
                text: message 
              });
            }
          })
        );

        try {
          
          const { data } = await queryFulfilled;

          
          dispatch(
            chatApi.util.updateQueryData("getChatHistory", session_id, (draft) => {
              if (Array.isArray(draft)) {
                draft.push({ 
                  role: "assistant", 
                  text: data.answer,
                  audio: data.audio_url 
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