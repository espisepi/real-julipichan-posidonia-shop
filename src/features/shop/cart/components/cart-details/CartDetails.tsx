import { useContext } from "react"
import { CartContext } from "../../context"

import { TAX_RATE_PERCENTAGE } from "@/constants";
import styles from './CartDetails.module.css';


export const CartDetails = () => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

    return (
      <div id='cart-details-component' className={styles.cart_details_component}>
        <div id='cart-details-title' className={styles.cart_details_title}>
          <p>Detalles del Carrito</p>
        </div>
        <div id='cart-details-number-of-products' className={styles.cart_details_row}>
          <p> Numero de productos </p>
          <p>
            {numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}{' '}
          </p>
        </div>
        <div id='cart-details-subtotal' className={styles.cart_details_row}>
          <p>Subtotal</p>
          <p> {subTotal} € </p>
        </div>
        <div id='cart-details-taxes' className={styles.cart_details_row}>
          <p>Impuestos ( {TAX_RATE_PERCENTAGE} % )</p>
          <p> {tax} € </p>
        </div>
        <div id='cart-details-total' className={styles.cart_details_row}>
          <p>Total: </p>
          <p> {total} € </p>
        </div>
      </div>
    )
}