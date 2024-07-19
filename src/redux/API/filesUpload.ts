import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosProgressEvent } from 'axios';
import { IFilesType, UploadFileArgs } from '../types/IFilesTypes';
import { RootState } from '../store';
import { addFile, addUploadFile, changeUploadFile, showUploader } from '../reducers/FileSlice';

const baseUrl = import.meta.env.VITE_CLOUD_STORE_BASE_URL;


export const uploadFile = createAsyncThunk<IFilesType, UploadFileArgs, { state: RootState }>(
    'files/uploadFile',
    async ({ file, dirId }, { dispatch }) => {
        const formData = new FormData();
        formData.append('file', file);
        if (dirId) {
            formData.append('parent', dirId);
        }

        const initialUploadFile = { name: file.name, progress: 0, id: Date.now() };
        dispatch(showUploader());
        dispatch(addUploadFile(initialUploadFile));

        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };


        const uploadFileRef = { ...initialUploadFile };

        const response = await axios.post<IFilesType>(`${baseUrl}/api/files/upload`, formData, {
            headers,
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const totalLength = progressEvent.total;
                if (totalLength) {

                    const updatedUploadFile = {
                        ...uploadFileRef,
                        progress: Math.round((progressEvent.loaded * 100) / totalLength),
                    };
                    console.log('uploadFile.progress', updatedUploadFile.progress);


                    dispatch(changeUploadFile(updatedUploadFile));
                }
            }
        });

        const data: IFilesType = await response.data;
        dispatch(addFile(data));
        return data;
    }
);
