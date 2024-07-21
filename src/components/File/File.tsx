import React from 'react'
import stilesFile from './styles/file.module.scss'
import folder from '../../image/folder.svg'
import fileSwg from '../../image/file.svg'
import { IFilesListProps } from './types/IFileProps'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setCurrentDir, addDiskStack } from '../../redux/reducers/FileSlice'
import downloadsvg from '../../icons/download.svg'
import deletesvg from '../../icons/box.svg'
import { downloadFile } from '../../redux/API/downloadFile'
import { fileDelete } from '../../redux/API/filesDelete'
import sizeFormat from '../untils/size/sizeFormat'





const File: React.FC<IFilesListProps> = ({ file }) => {


    //------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const dispatch = useAppDispatch()
    const openDir = () => {
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file._id))
            dispatch(addDiskStack(currentDir))
        } else {
            dispatch(setCurrentDir(''))
        }
    }

    const downloadHandler = (event: React.MouseEvent<HTMLButtonElement>,) => {
        event.stopPropagation();
        downloadFile(file);
    };

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        dispatch(fileDelete(file))
    }

    //------------------------------

    return (
        <li className={stilesFile.fileWrapper}>
            <div className={stilesFile.fileImage} onClick={openDir}>
                <img src={file.type === 'dir' ? folder : fileSwg} alt="" />
            </div>
            <div className={stilesFile.name}>{file.name}
                <div className={stilesFile.btnContainer}>
                    {file.type !== 'dir' ?
                        <button className={stilesFile.download} onClick={(event) => downloadHandler(event)}>
                            <img src={downloadsvg} alt="" />
                        </button>
                        :
                        ''
                    }

                    <button className={stilesFile.delete} onClick={(event) => deleteHandler(event)}>
                        <img src={deletesvg} alt="" />
                    </button>
                </div>
            </div>
            <p className={stilesFile.date}>{file.date ? new Date(file.date).toDateString().slice(0, 10) : ''}</p>
            <p className={stilesFile.size}>{sizeFormat(file.size)}</p>

        </li>
    )
}

export default File