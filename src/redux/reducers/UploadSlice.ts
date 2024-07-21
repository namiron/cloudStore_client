import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../types/IUploadTypes';




const initialState: IInitialState = {
    files: [],
    isVisible: false
}

const UploadSlice = createSlice({
    name: 'uploading',
    initialState,
    reducers: {
        showUploader(state) {
            state.isVisible = true
        },
        hideUploader(state) {
            state.isVisible = false
        },

        addUploadFile(state, { payload }) {
            return {
                ...state,
                files: [...state.files, payload]
            }
        },
        removeUploader(state, { payload }) {
            return {
                ...state,
                files: [...state.files.filter((file) => file.id !== payload.id)]
            }
        },
        changeUploadFile(state, { payload }) {
            return {
                ...state,
                files: [...state.files.map((file) => file.id === payload.id
                    ?
                    { ...file, progress: payload.progress }
                    :
                    { ...file }
                )]
            }
        }
    },
})

export const { showUploader, addUploadFile, hideUploader, removeUploader, changeUploadFile } = UploadSlice.actions

export default UploadSlice.reducer