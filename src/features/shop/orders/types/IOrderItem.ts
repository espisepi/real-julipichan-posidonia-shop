import { Entity } from "@/types";

export type IOrderItem = Entity & {
    title    : string;
    quantity : number;
    slug     : string;
    image    : string;
    price    : number;
}