import { Suspense } from "react";
import { ICart, ICartProduct } from "../../types";


type CartProductListProps = {
}


export const CartProductList = ( {  }: CartProductListProps ) => {

    const products = [];


    if( !products || products?.length === 0 ) {return (<h1>No hay productos en el carrito</h1>);}
    console.log(products)
    return (
      <>
          <h1>OYe</h1>
          {/* <div id='componente-listado-productos-carrito'></div> */}
          <div id='componente-listado-productos-carrito'>
            {products &&
              products.map((product, i) => (<p key={i}>ss</p>
            //     <div key={product.slug} id={`producto-carrito-${i}`}>
            //       {/* <h2>{product.title}</h2>
            //   <div id={`contador-carrito-${i}`} key={i}>
            //     <button onClick={(e) => updateCartQuantity(product, product.quantity + 1)}>+</button>
            //     <p>{product.quantity}</p>
            //     <button onClick={(e) => updateCartQuantity(product, product.quantity - 1)}>-</button>
            //   </div> */}
            //     </div>
              ))}
          </div>
      </>
    )
    

}