import { CartProductList, useProducts } from "@/features/shop";
import { ProductsList } from "@/features/shop";
import { useEffect } from "react";



export default function ShopPage() {

    const tag = undefined;



    // const { addProductToCart } = useCartStore;

    return (
      <div id='shop-page'>
        <h1>SHOP PAGE</h1>
        <ProductsList tag={tag} />
      </div>
    )
}