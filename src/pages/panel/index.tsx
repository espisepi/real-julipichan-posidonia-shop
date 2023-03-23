import { CartDetails, CartProductList, ProductCreateForm, ProductsList } from "@/features/shop";
import { PublicLayout } from "@/layouts/public-layout";



export default function PanelPage( ) {

    const tag = undefined;

    return (
      <PublicLayout>
        <div id='panel-page'>
          <h1>PANEL PAGE</h1>
          <ProductsList tag={tag} />
          <CartProductList />
          <CartDetails />
          <div>
           <p>Formulario para crear Producto</p>
           <ProductCreateForm />
          </div>
        </div>
      </PublicLayout>
    )
}