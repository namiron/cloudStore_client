import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateNewFile, IFilesType, IParentId } from "../types/IFilesTypes";
// import.meta.env.VITE_CLOUD_STORE_BASE_URL

//------------------
const baseUrl = import.meta.env.VITE_CLOUD_STORE_BASE_URL
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
        getFilesList: build.query<IFilesType[], IParentId>({
            query: ({ dirId }) => ({
                url: `/api/files${dirId ? `?parent=` + dirId : ''}`
            }),
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
        })
    })
});


//  alx@gmail.com
// alx
// lxa 
// 12345


// looo@gmail.com
// 1234