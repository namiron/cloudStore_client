export interface IRegistrationTypes {
    name: string,
    surname: string,
    email: string,
    password: string
}

export interface ILoginUserTypes {
    email: string,
    password: string
}
export interface IGetDataAboutUserType {
    token: string,
    user: {
        diskSpace: number,
        email: string,
        id: string,
        userSpace: number
        avatar?: string
    }
}

export interface IInitialState {
    isAuth: boolean,
    currentUser: IGetDataAboutUserType | {}
}
export interface IUserType {
    diskSpace: number,
    email: string,
    id: string,
    userSpace: number
    avatar?: string
}