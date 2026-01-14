import { apiSlice } from "./apiSlice";


export const claimlyGuidesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createClaimlyGuides: builder.mutation({
            query: (data) => ({
                url: '/claimlyGuide',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ClaimlyGuide']
        }),
        getClaimlyGuides: builder.query<any, void>({
            query: () => ({
                url: '/claimlyGuide',
                method: 'GET',
            }),
            providesTags: ['ClaimlyGuide']
        }),
        updateClaimlyGuide: builder.mutation({
            query: ({ id, data }) => ({
                url: `/claimlyGuide/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['ClaimlyGuide']
        }),
        deleteClaimlyGuide: builder.mutation({
            query: (id) => ({
                url: `/claimlyGuide/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ClaimlyGuide']
        }),
    }),
});

export const {
    useCreateClaimlyGuidesMutation,
    useGetClaimlyGuidesQuery,
    useUpdateClaimlyGuideMutation,
    useDeleteClaimlyGuideMutation
} = claimlyGuidesApi;

