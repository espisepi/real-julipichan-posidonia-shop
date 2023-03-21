import { Entity } from "@/types";
import { IShippingAddress } from "./IShippingAddress";
import { IOrderItem } from "./IOrderItem";

export type IOrder = {
    
    id? : string;
    createdAt?: string;
    updatedAt?: string;

    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;

    isPaid  : boolean;
    paidAt? : string;

    transactionId?: string;
}