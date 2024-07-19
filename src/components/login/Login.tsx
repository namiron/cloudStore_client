import React from 'react'
import Input from '../untils/input/Input';
import stylesLog from './styles/login.module.scss'
import { ENTER, REGISTRATION } from './constants/constants';
import { userApi } from '../../redux/API/userApi';




const Login: React.FC = () => {
    //---------------------------------------
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginUser, { isError }] = userApi.useCreateLoginUserMutation()
    const createLogin = async () => {
        return await loginUser({
            email,
            password,
        }).unwrap(),
            setEmail(''),
            setPassword('')
    }





    //---------------------------------------

    return (
        isError ? <div className="h2">failed to retrieve data</div>
            :
        <div className={stylesLog.login}>
            <div className={stylesLog.formBody}>
                <div className={stylesLog.loginHeading}>
                    <h1 className={stylesLog.loginTitle}> {REGISTRATION} </h1>
                </div>
                <div className={stylesLog.InputList}>
                        <Input type={'email'} placeholder={'email'} trigger={email} setTrigger={setEmail} />
                        <Input type={'password'} placeholder={'password'} trigger={password} setTrigger={setPassword} />
                        <button className={stylesLog.loginBtn} onClick={createLogin} >{ENTER}</button>
                </div>

            </div>
        </div>
    )
}

export default Login;