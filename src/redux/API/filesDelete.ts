import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFilesType } from '../types/IFilesTypes';
import { RootState } from '../store';
import { deleteFile } from '../reducers/FileSlice';

const baseUrl = 'https://cloudstore-server-dtyu.onrender.com';

console.log('delete', baseUrl);

export const fileDelete = createAsyncThunk<void, IFilesType, { state: RootState }>(
    'files/fileDelete',
    async (file: IFilesType, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseUrl}/api/files?id=${file._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { id: file._id }
            });
            console.log(response.data);

            dispatch(deleteFile(file._id));
        } catch (error) {
            console.error('Error deleting file:', error);
            return rejectWithValue(`${error}`);
        }
    }
);
