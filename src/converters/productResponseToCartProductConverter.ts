import { ProductResponse } from "@/features/shop"
import { ICartProduct } from "@/features/shop/cart/types";
import { uid } from "@/utils/uid";


type ProductResponseToCartProductConverterOptions = {
    product: ProductResponse;
}


export const productResponseToCartProductConverter = ({ product } : ProductResponseToCartProductConverterOptions) => {
    return {
        image: product.images[0],
        title: product.title,
        slug: product.slug,
        price: product.price,
        quantity: 1,
        id: product.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    } as ICartProduct;
}