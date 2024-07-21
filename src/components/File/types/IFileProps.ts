import { IUserType } from "../../../redux/types/IUserTypes";

export interface IFilesProps {
    _id: string;
    name: string;
    type: string;
    size: number | string;
    date: Date;
    accessLink?: string | any;
    path: string;
    user?: IUserType | {};
    parents?: string[];
    childs?: any[];
}

export interface IFilesListProps {
    key: string
    file: IFilesProps
}
