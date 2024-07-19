import React from 'react'
import stilesFile from './styles/file.module.scss'
import folder from '../../image/folder.svg'
import fileSwg from '../../image/file.svg'
import { IFilesProps } from './types/IFileProps'




const File: React.FC<IFilesProps> = ({ type, name, size, date }) => {
    //------------------------------

    //------------------------------

    return (
        <li className={stilesFile.fileWrapper}>

            <div className={stilesFile.fileImage}>
                <img src={type === 'dir' ? folder : fileSwg} alt="" />
            </div>
            <p className={stilesFile.name}>{name}</p>
            <p className={stilesFile.date}>{date ? new Date(date).toDateString().slice(0, 10) : ''}</p>
            <p className={stilesFile.size}>{size}</p>
        </li>
    )
}

export default File