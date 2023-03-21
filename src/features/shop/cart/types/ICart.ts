import { Entity } from "@/types"
import { IShippingAddress } from "../../orders";
import { ICartProduct } from "./ICartProduct";

export type ICart = Entity & {
    products: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: IShippingAddress;

};