import { IShippingAddress } from "../../orders";
import { ICart } from "./ICart"
import { ICartProduct } from "./ICartProduct";

// IMPORTANTE!!!!! ESTO ES DE ZUSTAND, NO DEBERIA USARSE EN EL PROYECTO

export type ICartStore = {

    cart: ICart;

    // isLoaded: boolean; // Para evitar que ocurra un error de hydration debido a que cuando renderiza el servidor no tiene los mismos datos que el cliente
    

    // Los metodos (de logica de negocio) lo pongo aqui en la store en vez de en ICart, porque es cuando defino la store, el momento en el que defino estos metodos

    // Methods manipulate Cart
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct, newQuantity: number) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: IShippingAddress) => void;

    updateCartInternalValues: () => void;

    // // Methods manipulate Orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;

}