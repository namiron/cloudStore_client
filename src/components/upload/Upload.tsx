import React from 'react'
import stylesUpload from './styles/upload.module.scss'
import UploadFile from '../uploadFile/UploadFile'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { hideUploader } from '../../redux/reducers/UploadSlice'

const Upload: React.FC = () => {
    const isVisible = useAppSelector((state) => state.uploading.isVisible)
    const dispatch = useAppDispatch()
    const filesUpload = useAppSelector((state) => state.uploading.files)
    return (
        isVisible &&
        <div className={stylesUpload.uploader} >

            <div className={stylesUpload.uploaderContainer}>
                <div className={stylesUpload.heading}>
                    <h2 className={stylesUpload.loading}>loading
                    </h2>
                    <button className={stylesUpload.close} onClick={() => dispatch(hideUploader())}>X</button>
                </div>

                <div className={stylesUpload.content}>
                    {
                        filesUpload.map((file) =>
                            (<UploadFile key={file.id} file={file} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload