import { baseApi } from "../../baseApi";

export const ProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Get all products
        getAllProduct: builder.query({
            query: () => ({
                url: `/bycles`,
                method: "GET",
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