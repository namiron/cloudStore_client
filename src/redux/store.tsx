import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./API/userApi";
import userSlice from "./reducers/UserSlice";
import filesSlice from './reducers/FileSlice';
import { filesApi } from "./API/filesApi";
import UploadSlice from "./reducers/UploadSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        files: filesSlice,
        uploading: UploadSlice,
        [userApi.reducerPath]: userApi.reducer,
        [filesApi.reducerPath]: filesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, filesApi.middleware)

})

export default store;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch