import { apiClient } from '@/lib/api-client';
import { AxiosResponse } from 'axios';



type UploadFileCloudinaryOptions = {
    params: {
        formData: globalThis.FormData;
    };
};

export const uploadFileCloudinary = ({
    params,
}: UploadFileCloudinaryOptions ): Promise<AxiosResponse<{ message: string; }>> => {
    const data = apiClient.post<{ message: string }>('/uploadCloudinary', params.formData)
    return data;
};