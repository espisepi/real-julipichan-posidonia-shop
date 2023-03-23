import { CartDetails, CartProductList, ProductsList } from "@/features/shop";



export default function PanelPage( ) {

    const tag = undefined;

    return (
      <div id='panel-page'>
        <h1>PANEL PAGE</h1>
        <ProductsList tag={tag} />
        <CartProductList />
        <CartDetails />
      </div>
    )
}