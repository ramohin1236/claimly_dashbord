import { apiSlice } from './apiSlice';

export const insurerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInsurerClaims: builder.query({
            query: (params) => {
                const { page, limit, status } = params || {};
                const queryParams = new URLSearchParams();

                if (page) queryParams.append('page', page);
                if (limit) queryParams.append('limit', limit);
                if (status) queryParams.append('status', status);

                return {
                    url: `/insurer/all-insurers?${queryParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Claim'],
        }),
        getSingleInsurer: builder.query<any, string>({
            query: (id) => ({
                url: `/insurer/single-insurer/${id}`,
                method: 'GET',
            }),
            providesTags: ['Claim'],
        }),
        updateInsurerStatus: builder.mutation({
            query: ({ id, body }) => ({
                url: `/insurer/update-insurer/${id}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Claim'],
        }),
    }),
});

export const {
    useGetInsurerClaimsQuery,
    useGetSingleInsurerQuery,
    useUpdateInsurerStatusMutation,
} = insurerApi;
