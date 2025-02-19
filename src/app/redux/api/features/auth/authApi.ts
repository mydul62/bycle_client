import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    Register: builder.mutation({
      query:(payload)=>({
          url:`auth/register`,
          method:"POST",
          body:payload
      })
  }),
  }),
});

export const { useLoginMutation,useRegisterMutation } = authApi; 
