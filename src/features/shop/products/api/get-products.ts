
import { apiClient } from '@/lib/api-client';
import { ProductResponse } from '../types';


type GetProductsOptions = {
    params?: {
        tag: string | undefined;
    };
};

export const getProducts = ({
    params,
}: GetProductsOptions ): Promise<ProductResponse[]> => {
    return apiClient.get('/shop/products', {
        params,
    });
};

