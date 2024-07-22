import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filesApi } from '../API/filesApi';
import { IInitialState, IFilesType, IUploadFile } from '../types/IFilesTypes';



const initialState: IInitialState = {
    files: [],
    currentDir: null,
    uploadFiles: [],
    uploaderVisible: false,
    diskStack: [],
    view: 'list'

};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setCurrentDir(state, { payload }) {
            state.currentDir = payload;
        },
        addDiskStack(state, { payload }) {
            state.diskStack = [...state.diskStack, payload]
        },
        showUploader(state) {
            state.uploaderVisible = true;
        },
        addUploadFile(state, { payload }: PayloadAction<IUploadFile>) {
            state.uploadFiles.push(payload);
        },
        setView(state, { payload }) {
            state.view = payload
        },
        changeUploadFile(state, { payload }: PayloadAction<IUploadFile>) {
            const index = state.uploadFiles.findIndex(file => file.id === payload.id);
            if (index !== -1) {
                state.uploadFiles[index] = payload;
            }
        },
        addFile(state, { payload }: PayloadAction<IFilesType>) {
            // Ensure that files state is updated
            const existingFileIndex = state.files.findIndex(file => file._id === payload._id);
            if (existingFileIndex === -1) {
                return {
                    ...state,
                    files: [...state.files, payload]
                }
            }
        },
        deleteFile(state, { payload }) {
            return {
                ...state,
                files: [...state.files.filter(file => file._id !== payload)]
            } 
        }
    },
    extraReducers: (builder) => {
        builder

            .addMatcher(
                filesApi.endpoints.getFilesList.matchFulfilled,
                (state, { payload }: PayloadAction<IFilesType[]>) => {
                    state.files = payload;
                }
            )
            .addMatcher(
                filesApi.endpoints.createNewFile.matchFulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        files: [...state.files, payload]
                    }
                }
            );
    }
});

export const { setCurrentDir, showUploader, addUploadFile, changeUploadFile, addFile, setView, addDiskStack, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;
