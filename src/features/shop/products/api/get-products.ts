import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { ProductResponse } from '../types';

// PAGINA WEB PARA SEGUIR APRENDIENDO SOBRE REACT_QUERY
// https://dev.to/arianhamdi/react-query-v4-ssr-in-next-js-2ojj

// https://www.telerik.com/blogs/react-query-fetching-data-right-way

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

export const useProducts = ({ params }: GetProductsOptions) => {
    const { data, isFetching, isFetched, ...dataUseQuery } = useQuery({
        queryKey: ['shop/products', params],
        queryFn: () => getProducts({ params }),
        enabled: !!params.tag,
        initialData: [],
    });

    // Ya no hace falta porque obtengo el goodData en el interceptor de axios definido en import { apiClient } from '@/lib/api-client';
    // let dataGood = data;
    // //@ts-ignore
    // if(dataGood && dataGood?.data) {
    //     //@ts-ignore
    //     dataGood = dataGood.data;
    // }

    return {
        ...dataUseQuery,
        data: data,
        isLoading: isFetching && isFetched,
    };
};