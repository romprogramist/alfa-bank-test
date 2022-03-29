import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Dog } from '../types'; 

export const dogsApi = createApi({
    reducerPath: 'dogsApi',
    tagTypes: ['Dogs'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://prioritet-online.ru/api/dogs'}), //localhost:8688
    endpoints: (builder) => ({
        getDogs: builder.query<Dog[], void>({
            query: () => 'all',
            providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Dogs' as const, id })), 'Dogs']
          : ['Dogs'],
        }),
        updateDog: builder.mutation<Dog, Partial<Dog> & Pick<Dog, 'id'>>({
            query: ({ id, ...data}) => ({
                url: `updatedog/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Dogs'],
        }),
        deleteDog: builder.mutation({
            query: (id) => ({
                url: `deletedog/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Dogs'],
        })
    })
});

export const {useGetDogsQuery, useUpdateDogMutation, useDeleteDogMutation} = dogsApi;