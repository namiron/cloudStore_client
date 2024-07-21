export interface IUploadFileProps {
    key: string,
    file: {
        id: string,
        progress: number,
        name: string
    }
}