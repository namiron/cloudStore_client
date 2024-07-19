import React from 'react'
import stilesFile from './styles/file.module.scss'
import folder from '../../image/folder.svg'
import fileSwg from '../../image/file.svg'
import { IFilesProps } from './types/IFileProps'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setCurrentDir, addDiskStack } from '../../redux/reducers/FileSlice'




const File: React.FC<IFilesProps> = ({ type, name, size, date, _id }) => {
    //------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const dispatch = useAppDispatch()
    const openDir = () => {
        if (type === 'dir') {
            dispatch(setCurrentDir(_id))
            dispatch(addDiskStack(currentDir))
        } else {
            dispatch(setCurrentDir(''))
        }

    }
    //------------------------------

    return (
        <li className={stilesFile.fileWrapper}>
            <div className={stilesFile.fileImage} onClick={openDir}>
                <img src={type === 'dir' ? folder : fileSwg} alt="" />
            </div>
            <p className={stilesFile.name}>{name}</p>
            <p className={stilesFile.date}>{date ? new Date(date).toDateString().slice(0, 10) : ''}</p>
            <p className={stilesFile.size}>{size}</p>
        </li>
    )
}

export default File