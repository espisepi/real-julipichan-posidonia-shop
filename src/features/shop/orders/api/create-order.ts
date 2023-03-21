import { apiClient } from "@/lib/api-client";
import { IOrder } from "../types/IOrder";



type CreateOrderOptions = {
    data: IOrder;
};


export const createOrder = ({
    data
}: CreateOrderOptions ): Promise<IOrder> => {
    return apiClient.post('/shop/orders', data);
}