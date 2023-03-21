import { Entity } from "@/types";

export type ICartProduct = Entity & {
    image: string;
    title: string;
    slug: string;
    price: number;
    quantity: number;
}