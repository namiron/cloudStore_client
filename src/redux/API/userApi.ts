import { IGetDataAboutUserType, ILoginUserTypes, IRegistrationTypes } from '../types/IUserTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURl = import.meta.env.VITE_CLOUD_STORE_BASE_URL

export const userApi = createApi({
    reducerPath: 'registrationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } else {
                localStorage.removeItem('token');
            }
            return headers;
        },

    }),
    endpoints: (build) => ({
        createRegistrationUser: build.mutation<IRegistrationTypes, IRegistrationTypes>({
            query: ({ email, password, name, surname }) => ({
                url: `/api/auth/registration`,
                method: 'POST',
                body: { email, password, name, surname }
            })
        }),
        createLoginUser: build.mutation<IGetDataAboutUserType, ILoginUserTypes>({
            query: ({ email, password }) => ({
                url: `/api/auth/login`,
                method: 'POST',
                body: { email, password }
            })
        }),
        getAuthUser: build.query<IGetDataAboutUserType, void>({
            query: () => ({
                url: `/api/auth/auth`,
            })
        })
    })
})



//  alx@gmail.com
// alx
// lxa 
// 12345