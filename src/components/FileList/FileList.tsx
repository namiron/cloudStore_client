import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { filesApi } from '../../redux/API/filesApi';
import { setCurrentDir } from '../../redux/reducers/FileSlice';
import File from '../File/File';

const FileList: React.FC = () => {
    //--------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const dispatch = useAppDispatch()
    const { data } = filesApi.useGetFilesListQuery({ dirId: currentDir });


    React.useEffect(() => { dispatch(setCurrentDir(currentDir)) }, [currentDir]);

    //--------------------------------

    return (
        <ul>
            {
                data && data.length > 0 && data.map((file) => {
                    return <File key={file._id} file={file} />
                })
            }
        </ul>
    )
}

export default FileList