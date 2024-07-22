
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateNewFile, IFilesType } from "../types/IFilesTypes";


//------------------
const baseUrl = 'https://cloudstore-server-dtyu.onrender.com'
console.log('files', baseUrl);
//------------------


export const filesApi = createApi({
    reducerPath: "filesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Files'],
    endpoints: (build) => ({
        getFilesList: build.query<IFilesType[], { dirId?: string; sort?: string }>({
            query: ({ dirId, sort }) => {
                let url = `api/files`;

                const params = new URLSearchParams();

                if (dirId) {
                    params.append('parent', dirId);
                }

                if (sort) {
                    params.append('sort', sort);
                }

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }
                console.log('Constructed URL:', url)

                return { url };
            },
            providesTags: (result) =>
                result ?
                    [...result.map(({ _id }) => ({ type: 'Files', id: _id } as const)), { type: 'Files', id: 'LIST' }] :
                    [{ type: 'Files', id: 'LIST' }]
        }),
        createNewFile: build.mutation<IFilesType, ICreateNewFile>({
            query: ({ dirId, name }) => ({
                url: `/api/files`,
                method: 'POST',
                body: {
                    name: name,
                    parent: dirId,
                    type: 'dir'
                }
            }),
            invalidatesTags: [{ type: 'Files', id: 'LIST' }]
        }),

    })
});


