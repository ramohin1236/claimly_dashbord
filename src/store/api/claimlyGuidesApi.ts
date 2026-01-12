import { apiSlice } from "./apiSlice";


export const claimlyGuidesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createClaimlyGuides: builder.mutation({
            query: (data) => ({
                url: '/claimlyGuide',
                method: 'POST',
                body: data,
            }),
        }),
       
    }),
});

export const { useCreateClaimlyGuidesMutation } = claimlyGuidesApi;

