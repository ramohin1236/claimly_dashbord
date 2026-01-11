import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (params) => {
                const { page, limit, search, isBlocked } = params || {};
                const queryParams = new URLSearchParams();

                if (page) queryParams.append('page', page);
                if (limit) queryParams.append('limit', limit);
                if (search) queryParams.append('search', search);
                if (isBlocked !== undefined && isBlocked !== null) queryParams.append('isBlocked', isBlocked);

                return {
                    url: `/normal-User?${queryParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['User'],
        }),
        toggleBlockUser: builder.mutation({
            query: (id) => ({
                url: `/auth/block-toggle/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUsersQuery, useToggleBlockUserMutation } = userApi;
