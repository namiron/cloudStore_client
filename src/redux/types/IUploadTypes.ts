export interface IInitialState {
    isVisible: boolean,
    files: IFilesUploadType[] | []
}

export interface IFilesUploadType {
    id: string
    name: string,
    progress: number
}