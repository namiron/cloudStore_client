import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { filesApi } from '../../redux/API/filesApi';
import { setCurrentDir } from '../../redux/reducers/FileSlice';
import File from '../File/File';

const FileList: React.FC = () => {
    //--------------------------------
    const files = useAppSelector((state) => state.files.files)
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const dispatch = useAppDispatch()
    const { data } = filesApi.useGetFilesListQuery({ dirId: currentDir });
    React.useEffect(() => { dispatch(setCurrentDir(currentDir)) }, [currentDir]);


    console.log('data', data);
    console.log('files', files);
    console.log('currentDir', currentDir);
    //--------------------------------

    return (
        <ul>
            {
                files && files.length > 0 && files.map(({ _id, name, type, size, path, date }) => {
                    return <File key={_id} name={name} type={type} size={size} path={path} date={date} />
                })
            }
        </ul>
    )
}

export default FileList