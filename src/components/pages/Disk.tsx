import React from 'react'
import stylesDisk from './styles/disk.module.scss'
import arrowBag from '../../icons/arrow-bag.svg'
import FileList from '../FileList/FileList'
import Popup from '../PopUp/PopUp'


const Disk: React.FC = () => {
    //-------------------------------
    const [visible, setVisible] = React.useState<boolean>(false)

    const openPopup = () => {
        setVisible(!visible)
    };

    //-------------------------------

    return (
        <div className={stylesDisk.disk}>
            <div className={stylesDisk.diskContainer}>
                <div className={stylesDisk.buttonsDisk}>
                    <button className={stylesDisk.diskBack} >
                        <img src={arrowBag} alt="arrowBag" />
                    </button>
                    <button className={stylesDisk.createDir} onClick={() => openPopup()} >create directory</button>
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
    )
}

export default Disk