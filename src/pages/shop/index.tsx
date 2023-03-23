import { ProductsList } from "@/features/shop";



export default function ShopPage() {

    const tag = undefined;

    return (
      <div id='shop-page'>
        <h1>SHOP PAGE</h1>
        <ProductsList tag={tag} />
      </div>
    )
}