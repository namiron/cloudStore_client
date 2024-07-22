import React from 'react'
import stylesNav from './styles/navbar.module.scss'
import disk from './images/disk.png'
import { NavLink } from 'react-router-dom'
import { CLOUD_STORE, EXIT, LOGIN, REGISTRATION } from './constants/constants';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { reLogin } from '../../redux/reducers/UserSlice';


const Navbar: React.FC = () => {
    //--------------------------------------------
    const isAuth = useAppSelector((state) => state.users.isAuth)
    const dispatch = useAppDispatch()
    const [searchName, setSearchName] = React.useState<string>('')

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value)
    }
    //--------------------------------------------

    return (
        <div className={stylesNav.navbar}>
            <div className={stylesNav.container}>
                <div className={stylesNav.logoBox}>
                    <div className={stylesNav.logo}>
                        <img src={disk} alt='disk' />
                    </div>
                    <p className={stylesNav.item}>{CLOUD_STORE}</p>
                </div>
                {
                    !isAuth ? <ul className={stylesNav.list}>
                    <li className={stylesNav.item}><NavLink to='/login'>{LOGIN}</NavLink></li>
                    <li className={stylesNav.item}><NavLink to='/registration'>{REGISTRATION}</NavLink> </li>
                    </ul> :
                        <ul className={stylesNav.list}>
                            <div className="search">
                                <input type="text" className='searchInput' placeholder='search'
                                    value={searchName}
                                    onChange={(e) => searchHandler(e)} />
                            </div>
                            <li className={stylesNav.item} onClick={() => dispatch(reLogin())}>{EXIT}</li>
                        </ul>
                }
            </div>
        </div >
    )
}

export default Navbar;