import { useProducts } from "@/features/shop";
import { ProductsList } from "@/features/shop/products/components/products-list";
import { useEffect } from "react";



export default function ShopPage() {

    const tag = undefined;

    const products = useProducts({
        params: {
            tag: tag,
        },
    });

    useEffect(()=>{
        if(products) {
            // Ejecutamos la peticion al api endpoint con react-query
            products.refetch();
        }
    },[])

    return (
      <div id='shop-page'>
        <h1>SHOP PAGE</h1>
        <ProductsList products={products.data} isLoading={products.isLoading} tag={tag} />
      </div>
    )
}