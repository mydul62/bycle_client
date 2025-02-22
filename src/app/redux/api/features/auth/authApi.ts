import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Login
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // User Registration
    register: builder.mutation({
      query: (payload) => ({
        url: 'auth/register',
        method: 'POST',
        body: payload,
      }),
    }),

    // Get All Users (Admin only)
    getAllUsers: builder.query({
      query: () => ({
        url: 'auth/alluser',
        method: 'GET',
      }),
    }),

    // Get Single User (Admin/User)
    getSingleUser: builder.query({
      query: () => ({
        url: '/singleuser',
        method: 'GET',
      }),
    }),

    // Update User Profile (Admin/User)
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/updateuser',
        method: 'PUT',
        body: userData,
      }),
    }),

    // Update User Role (Admin only)
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/updateRole/${id}`,
        method: 'PUT',
        body: { role },
      }),
    }),

    // Delete User (Admin only)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deletedUser/${id}`,
        method: 'DELETE',
      }),
    }),

    // Change Password (Admin/User)
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/changePassword',
        method: 'PUT',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = authApi;
