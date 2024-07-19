import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filesApi } from '../API/filesApi';
import { IInitialState, IFilesType, IUploadFile } from '../types/IFilesTypes';
import { uploadFile } from '../API/filesUpload';


const initialState: IInitialState = {
    files: [],
    currentDir: null,
    uploadFiles: [], // Добавляем поле для отслеживания загрузок
    uploaderVisible: false // Добавляем поле для управления видимостью загрузчика
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setCurrentDir(state, { payload }: PayloadAction<any>) {
            state.currentDir = payload;
        },
        showUploader(state) {
            state.uploaderVisible = true;
        },
        addUploadFile(state, { payload }: PayloadAction<IUploadFile>) {
            state.uploadFiles.push(payload);
        },
        changeUploadFile(state, { payload }: PayloadAction<IUploadFile>) {
            const index = state.uploadFiles.findIndex(file => file.id === payload.id);
            if (index !== -1) {
                state.uploadFiles[index] = payload;
            }
        },
        addFile(state, { payload }) {
            state.files = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    files: [...state.files, payload]
                }
            })
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

export const { setCurrentDir, showUploader, addUploadFile, changeUploadFile, addFile } = fileSlice.actions;

export default fileSlice.reducer;
