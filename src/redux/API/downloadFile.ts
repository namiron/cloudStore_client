import { IFilesType, } from './../types/IFilesTypes';



const baseUrl = import.meta.env.VITE_CLOUD_STORE_BASE_URL;

export const downloadFile = async (file: IFilesType) => {

    if (!file._id) {
        console.error('File ID is missing');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': `Bearer ${token}`,
        });

        const response = await fetch(`${baseUrl}/api/files/download?id=${file._id}`, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } else {
            console.error('Download failed with status:', response.status);

        }
    } catch (error) {
        console.error('Download error:', error);

    }
}
