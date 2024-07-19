import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { filesApi } from '../../redux/API/filesApi';
import { setCurrentDir } from '../../redux/reducers/FileSlice';
import File from '../File/File';

const FileList: React.FC = () => {
    //--------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const files = useAppSelector((state) => state.files.files)
    const dispatch = useAppDispatch()
    const { data } = filesApi.useGetFilesListQuery({ dirId: currentDir });
    console.log('files', files);

    React.useEffect(() => { dispatch(setCurrentDir(currentDir)) }, [currentDir]);

    //--------------------------------

    return (
        <ul>
            {
                data && data.length > 0 && data.map(({ _id, name, type, size, path, date }) => {
                    return <File key={_id} name={name} type={type} size={size} path={path} date={date} _id={_id} />
                })
            }
        </ul>
    )
}

export default FileList