import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://7bn5s1dw-4444.inc1.devtunnels.ms/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['User']
});
