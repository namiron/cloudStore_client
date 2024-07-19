import React from 'react'

import stylesLayout from './styles/layout.module.scss'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
    return (
        <>
            <div className={stylesLayout.mainBox}>
                <Outlet />
                hello
            </div>
        </>


    )
}

export default Layout