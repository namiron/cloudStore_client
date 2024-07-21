import React from 'react'
import { IUploadFileProps } from './types/IUploadFileProps'
import stylesUploadFile from './styles/uploadFile.module.scss'
import { useAppDispatch } from '../hooks/hooks'
import { removeUploader } from '../../redux/reducers/UploadSlice'

const UploadFile: React.FC<IUploadFileProps> = ({ file }) => {
    //-----------------------
    const dispatch = useAppDispatch()

    //-----------------------

    return (
        <div className={stylesUploadFile.uploadFile}>
            <div className={stylesUploadFile.uploadFileHeader}>
                <h2 className={stylesUploadFile.nameFile}>{file.name}</h2>
                <button className={stylesUploadFile.remove} onClick={() => dispatch(removeUploader(file.id))}>X</button>
            </div>
            <div className={stylesUploadFile.progressBar}>
                <div className={stylesUploadFile.line} style={{ width: file.progress + '%' }}></div>
                <div className={stylesUploadFile.present}>{file.progress}%</div>
            </div>
        </div>
    )
}

export default UploadFile