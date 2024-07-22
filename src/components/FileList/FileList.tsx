import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { filesApi } from '../../redux/API/filesApi';
import { setCurrentDir } from '../../redux/reducers/FileSlice';
import File from '../File/File';
import { IDiskPops } from './types/IFileListTypes';
import stylesFileList from './styles/filelist.module.scss'

const FileList: React.FC<IDiskPops> = ({ sort }) => {
    //--------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const fileView = useAppSelector((state) => state.files.view);

    const dispatch = useAppDispatch()
    const { data } = filesApi.useGetFilesListQuery({ dirId: currentDir, sort });
    console.log(data);



    React.useEffect(() => { dispatch(setCurrentDir(currentDir)) }, [currentDir]);

    //--------------------------------
    if (fileView === 'list') {
        return (
            <ul className={stylesFileList.list}>
                {
                    data && data.length > 0 && data.map((file) => {
                        return <File key={file._id} file={file} />
                    })
                }
            </ul>
        )
    } else if (fileView === 'nine') {
        return (
            <ul className={stylesFileList.nine}>
                {
                    data && data.length > 0 && data.map((file) => {
                        return <File key={file._id} file={file} />
                    })
                }
            </ul>
        )
    } else if (fileView === 'plate') {
    return (
        <ul className={stylesFileList.plate}>
            {
                data && data.length > 0 && data.map((file) => {
                    return <File key={file._id} file={file} />
                })
            }
        </ul>
    )
}

}

export default FileList