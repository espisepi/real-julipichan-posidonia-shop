import { Suspense, useContext } from "react";
import { ICart, ICartProduct } from "../../types";
import { CartContext } from "../../context";


type CartProductListProps = {
}


export const CartProductList = ( {  }: CartProductListProps ) => {

    const { cart: products, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    if( !products || products?.length === 0 ) {return (<h1>No hay productos en el carrito</h1>);}

    return (
      <>
          <h1>OYe</h1>
          {/* <div id='componente-listado-productos-carrito'></div> */}
          <div id='componente-listado-productos-carrito'>
            {products &&
              products.map((product, i) => (
                <div key={product.slug} id={`producto-carrito-${i}`}>
                  <h2>{product.title}</h2>
                  <div id={`contador-carrito-${i}`} key={i}>
                    <button onClick={(e) => updateCartQuantity(product, product.quantity + 1)}>+</button>
                    <p>{product.quantity}</p>
                    <button onClick={(e) => updateCartQuantity(product, product.quantity - 1)}>-</button>
                  </div>
                </div>
              ))}
          </div>
      </>
    )
    

}