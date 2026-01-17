import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://claimly-insurance-server.vercel.app/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['User', 'FAQ', 'PrivacyPolicy', 'TermsConditions', 'ClaimlyGuide', 'Claim', 'MetaData', 'AdminProfile']
});
