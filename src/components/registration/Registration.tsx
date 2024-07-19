import React from 'react'
import Input from '../untils/input/Input';
import stylesReg from './styles/registration.module.scss'
import { ENTER, REGISTRATION } from './constants/constants';
import { userApi } from '../../redux/API/userApi';

const Registration: React.FC = () => {
    //---------------------------------------
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [createUser, { isError }] = userApi.useCreateRegistrationUserMutation() 
    //---------------------------------------

    const handleRegistration = async () => {
        await createUser({
            email,
            password,
            name,
            surname
        }).unwrap(),
            setEmail(''),
            setPassword(''),
            setName(''),
            setSurname('')
    }

    return (
        isError ? <div className="h2">failed to retrieve data</div>
            :
        <div className={stylesReg.registration}>
            <div className={stylesReg.formBody}>
                <div className={stylesReg.registrationHeading}>
                    <h1 className={stylesReg.registrationTitle}> {REGISTRATION} </h1>
                </div>
                <div className={stylesReg.InputList}>
                    <Input type={'text'} placeholder={'Your name'} trigger={name} setTrigger={setName} />
                    <Input type={'text'} placeholder={'Your surname'} trigger={surname} setTrigger={setSurname} />
                    <Input type={'email'} placeholder={'email'} trigger={email} setTrigger={setEmail} />
                    <Input type={'password'} placeholder={'password'} trigger={password} setTrigger={setPassword} />
                        <button onClick={handleRegistration} className={stylesReg.registrationBtn}>{ENTER}</button>
                </div>

            </div>
        </div>
    )
}

export default Registration;