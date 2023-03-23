import { useContext } from "react"
import { CartContext } from "../../context"

import { TAX_RATE_PERCENTAGE } from "@/constants";



export const CartDetails = () => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

    return (
      <div id='cart-details-component'>
        <div id='cart-details-title'>
          <p>Detalles del Carrito</p>
        </div>
        <div id='cart-details-number-of-products'>
          <p> Numero de productos </p>
          <p>
            {numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}{' '}
          </p>
        </div>
        <div id='cart-details-subtotal'>
          <p>Subtotal</p>
          <p> {subTotal} € </p>
        </div>
        <div id='cart-details-taxes'>
          <p>Impuestos ( {TAX_RATE_PERCENTAGE} %)</p>
          <p> {tax} € </p>
        </div>
        <div id="cart-details-total">
            <p>Total: </p>
            <p> {total} € </p>
        </div>
      </div>
    )
}