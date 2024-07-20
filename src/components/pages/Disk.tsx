import React from 'react'
import stylesDisk from './styles/disk.module.scss'
import arrowBag from '../../icons/arrow-bag.svg'
import FileList from '../FileList/FileList'
import Popup from '../PopUp/PopUp'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { addDiskStack, setCurrentDir } from '../../redux/reducers/FileSlice'
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadFile } from '../../redux/API/filesUpload'

const Disk: React.FC = () => {
    //-------------------------------
    const [visible, setVisible] = React.useState<boolean>(false)
    const [dragEnter, setDragEnter] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    //-----------------------------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);
    const openPopup = () => {
        setVisible(!visible)
    };
    const diskStack = useAppSelector((state) => state.files.diskStack)
    console.log('diskStack', diskStack);

    const backDir = () => {
        const newDiskStack = diskStack.slice(0, -1);
        const backDirId = diskStack[diskStack.length - 1];

        dispatch(setCurrentDir(backDirId));
        dispatch(addDiskStack(newDiskStack));
    }


    const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            filesArray.forEach(file => {
                dispatch(uploadFile({ file, dirId: currentDir }));
            });
        }
    };

    //---------------------DragFunctions
    const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(true)
    }
    const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(false)
    }
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(true)
    }


    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        if (files) {
            const filesArray = Array.from(files);
            filesArray.forEach(file => {
                dispatch(uploadFile({ file, dirId: currentDir }));
            });
        }
        setDragEnter(false)

    }
    //---------------------DragFunctions


    //-------------------------------

    return (
        !dragEnter ?
            <div className={stylesDisk.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler} >
            <div className={stylesDisk.diskContainer}>
                <div className={stylesDisk.buttonsDisk}>
                    <button className={stylesDisk.diskBack} onClick={backDir} >
                        <img src={arrowBag} alt="arrowBag" />
                    </button>
                    <button className={stylesDisk.createDir} onClick={() => openPopup()} >create directory</button>
                    <div className={stylesDisk.upload}>
                        <label htmlFor="uploadFile" className={stylesDisk.uploadLabel}>
                            <IoCloudUploadOutline className={stylesDisk.uploadIcons} />
                            <input multiple={true} onChange={(e) => uploadFiles(e)} type="file" id='uploadFile' className={stylesDisk.uploadInput} />

                        </label>
                    </div>
                </div>
                <div className={stylesDisk.diskFiles}>
                    <ul className={stylesDisk.nameList}>
                        <li className={stylesDisk.itemName}>name</li>
                        <li className={stylesDisk.itemName}>time</li>
                        <li className={stylesDisk.itemName}>data</li>
                    </ul>

                    {visible && <Popup setVisible={setVisible} visible={visible} />}
                    <FileList />
                </div>
            </div>
        </div>
            :
            <div className={stylesDisk.dropContainer} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler}>
                <div className={stylesDisk.dragDrop}>
                    drop your files here
                </div>
            </div>

    )
}

export default Disk