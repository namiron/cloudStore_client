import React from 'react'
import popup from './styles/popup.module.scss'

import { filesApi } from '../../redux/API/filesApi';
import { useAppSelector } from '../hooks/hooks';
import { IPopupProps } from './types/IPopUpProps';


const Popup: React.FC<IPopupProps> = ({ visible, setVisible }) => {
    //-----------------------------------------------------
    const currentDir = useAppSelector((state) => state.files.currentDir);


    const [dirname, setDirname] = React.useState('');
    const [createNewFile] = filesApi.useCreateNewFileMutation()

    const createDir = async () => {
        try {
            await createNewFile({
                dirId: currentDir,
                name: dirname,
            }).unwrap();
            setVisible(false);
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    //-----------------------------------------------------
    return (
        <div className={popup.popup}>
            <div className={popup.popupContent}>
                <div className={popup.popupHeader}>
                    <div className={popup.popupTitle}>Create Directory</div>
                    <button className={popup.closePopup} onClick={() => setVisible(!visible)}>X</button>
                </div>
                <input
                    type="text"
                    placeholder="Directory name"
                    value={dirname}
                    onChange={(e) => setDirname(e.target.value)}
                />
                <button onClick={createDir} className={popup.createDir}>Create</button>
            </div>
        </div>
    );
};

export default Popup;