import { userApi } from '../API/userApi';
import { IInitialState } from './../types/IUserTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IInitialState = {
    isAuth: !!localStorage.getItem('token'),
    currentUser: {}
}

const userSlice = createSlice({
    name: `users`,
    initialState,
    reducers: {
        reLogin(state) {
            state.currentUser = {}
            state.isAuth = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.createLoginUser.matchFulfilled, (state, { payload }) => {
                state.isAuth = true
            state.currentUser = payload;
            localStorage.setItem('token', payload.token);
        }
        );
    },
})
export const { reLogin } = userSlice.actions

export default userSlice.reducer