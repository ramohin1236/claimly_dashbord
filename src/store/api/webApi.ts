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
        getMetaData: builder.query<any, void>({
            query: () => ({
                url: '/meta/meta-data',
                method: 'GET'
            }),
            providesTags: ['MetaData']
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
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/manage-Web/delete-faq/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FAQ']
        }),
        updateFaq: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/manage-Web/edit-faq/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: [{ type: 'FAQ', id: 'LIST' }]
        }),

    }),
});

export const {
    useCreateTermsConditionsMutation,
    useCreatePrivacyPolicyMutation,
    useCreateFAQMutation,
    useGetFaqQuery,
    useGetPrivacyPolicyQuery,
    useGetTermsConditionsQuery,
    useDeleteFaqMutation,
    useUpdateFaqMutation,
    useGetMetaDataQuery
} = webApi;
