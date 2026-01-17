import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

         getAdminProfile: builder.query<any, void>({
            query: () => ({
                url: '/user/getMe',
                method: 'GET'

            }),
            providesTags: ["AdminProfile"]
        }),
          updateAdminProfile: builder.mutation<any, FormData>({
            query: (data) => ({
                url: '/user/updateMe',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["AdminProfile"]
        }),
      
    }),
});


export const {
    useGetAdminProfileQuery,
    useUpdateAdminProfileMutation,
} = adminApi;