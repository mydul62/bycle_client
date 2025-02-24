import { baseApi } from "../../baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Get all products
        getAllOrder: builder.query({
            query: () => ({
                url: `/orders`,
                method: "GET",
            }),
        }),
        // Create a new product
        createOrder: builder.mutation({
            query: (newProduct) => ({
                url: "orders/",
                method: "POST",
                body: newProduct,
            }),
        }),
        getVerifyOrder: builder.query({
            query:(order_id)=>({
                url:`orders/verify`,
                params: { order_id },
                method:"GET"
            })
        }),
        // Delete a product
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks
export const {
    useGetVerifyOrderQuery,
 useCreateOrderMutation,
 useGetAllOrderQuery,
useDeleteOrderMutation
} = orderApi;