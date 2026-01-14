import { apiSlice } from './apiSlice';

export const webApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTermsConditions: builder.mutation({
            query: (data) => ({
                url: '/manage-Web/add-terms-conditions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TermsConditions']
        }),
        getTermsConditions: builder.query<any, void>({
            query: () => ({
                url: '/manage-Web/get-terms-conditions',
                method: 'GET'
            }),
            providesTags: ['TermsConditions']
        }),
        createPrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: '/manage-Web/add-privacy-policy',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['PrivacyPolicy']
        }),
        getPrivacyPolicy: builder.query<any, void>({
            query: () => ({
                url: '/manage-Web/get-privacy-policy',
                method: 'GET'
            }),
            providesTags: ['PrivacyPolicy']
        }),
        createFAQ: builder.mutation({
            query: (data) => ({
                url: '/manage-Web/add-faq',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'FAQ', id: 'LIST' }]
        }),
        getFaq: builder.query<any, void>({
            query: () => ({
                url: '/manage-Web/get-faq',
                method: 'GET'
            }),
            providesTags: [{ type: 'FAQ', id: 'LIST' }]
        }),

    }),
});

export const {
    useCreateTermsConditionsMutation,
    useCreatePrivacyPolicyMutation,
    useCreateFAQMutation,
    useGetFaqQuery,
    useGetPrivacyPolicyQuery,
    useGetTermsConditionsQuery
} = webApi;
