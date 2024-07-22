import { IUserType } from "./IUserTypes"

export interface IFilesType {
    _id: string;
    name: string;
    type: string;
    size: number;
    date: Date;
    accessLink?: string | any;
    path: string;
    user?: IUserType | {};
    parents?: string[];
    childs?: any[];
}

export interface IFileDownloadType {
    file: {
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
}

export interface IParentId {
    dirId?: IFilesType | null;
}
export interface ICreateNewFile {
    dirId: string;
    name: string
}

export interface IUploadFile {
    name: string;
    progress: number;
    id: number;
}

export interface UploadFileArgs {
    file: File;
    dirId?: string;
}

export interface UploadFileResponse {
    data: IFilesType;
}

export interface IInitialState {
    files: IFilesType[] | [],
    currentDir: any,
    uploadFiles: IUploadFile[],
    uploaderVisible: boolean,
    diskStack: string[]
    view: string,
}

export interface PathApi {
    rejectValue: { message: string };
}
