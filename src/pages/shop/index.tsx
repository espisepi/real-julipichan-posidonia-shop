import { CartProductList, useProducts } from "@/features/shop";
import { ProductsList } from "@/features/shop/products/components/products-list";
import { useEffect } from "react";



export default function ShopPage() {

    const tag = undefined;



    // const { addProductToCart } = useCartStore;

    return (
      <div id='shop-page'>
        <h1>SHOP PAGE</h1>
        <ProductsList tag={tag} />
        <CartProductList />
      </div>
    )
}