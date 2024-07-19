import React from 'react'
import stylesContent from './styles/content.module.scss'
import Disk from '../pages/Disk'

const Content: React.FC = () => {
    return (
        <div className={stylesContent.contentBody}><Disk /></div>
    )
}

export default Content