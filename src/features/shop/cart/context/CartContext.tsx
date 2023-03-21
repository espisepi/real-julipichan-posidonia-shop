import { createContext } from 'react';

import { ICartProduct } from '../types';
import { IShippingAddress } from '../../orders';


interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: IShippingAddress,

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct, newQuantity: number) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: IShippingAddress) => void;

    // Orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;
}


export const CartContext = createContext({} as ContextProps );