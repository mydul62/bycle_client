import { baseApi } from "../../baseApi";

export const ProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Get all products
      getAllProduct: builder.query({
  query: ({ search, sort, minPrice, maxPrice }) => ({
    url: `/bycles`,
    method: "GET",
    params: {
      search: search || undefined,
      sort: sort || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    },
  }),
}),

        //  Get single product
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `bycles/${id}`,
                method: "GET",
            }),
        }),

        // Create a new product
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: "bycles/",
                method: "POST",
                body: newProduct,
            }),
        }),

        // Update a product
        updateProduct: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `bycles/${id}`,
                method: "PUT",
                body: updatedData,
            }),
        }),

        // Delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `bycles/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks
export const {
    useGetAllProductQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = ProductApi;