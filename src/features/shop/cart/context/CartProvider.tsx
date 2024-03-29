import { FC, useEffect, useReducer, useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

import { CartContext, cartReducer } from './';
// import { apiClient as tesloApi } from '@/lib/api-client';
//import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { ICartProduct} from '../types';
import { IOrder, IShippingAddress } from '@/features/shop';

import { createOrder as createOrderApi } from '@/features/shop';
import { TAX_RATE } from '@/constants';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: IShippingAddress;
}



const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props {
    children: React.ReactNode;
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    const [isCookieSearched, setIsCookieSearched] = useState(false);

    // Efecto
    useEffect(() => {
        try {
            setIsCookieSearched(true);
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): [];
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);


    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
                firstName : Cookie.get('firstName') || '',
                lastName  : Cookie.get('lastName') || '',
                address   : Cookie.get('address') || '',
                address2  : Cookie.get('address2') || '',
                zip       : Cookie.get('zip') || '',
                city      : Cookie.get('city') || '',
                country   : Cookie.get('country') || '',
                phone     : Cookie.get('phone') || '',
            }
            
            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])
    


    
    useEffect(() => {
        // Pongo este if como fix porque en "yarn dev" aparece al principio -> state.cart = []  y despues se añaden las cookies, pero si no se pone ese if se resetean las cookies con la lista vacia antes de volverlas a leer y obtener los productos
        if( isCookieSearched ) {
            Cookie.set('cart', JSON.stringify(state.cart));
        }
    }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const taxRate =  TAX_RATE;
        const tax = subTotal * taxRate;
        const total = subTotal * (taxRate + 1);

        // Poner los numeros con dos decimales como maximo: .toFixed(2)
        const subTotalFixed = Number(subTotal.toFixed(2));
        const taxFixed = Number(tax.toFixed(2));
        const totalFixed = Number(total.toFixed(2));
    
        const orderSummary = {
          numberOfItems,
          subTotal: subTotalFixed,
          tax: taxFixed,
          total: totalFixed,
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {
        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! Nivel Final
        const productInCart = state.cart.some( p => p.id === product.id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })


        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p.id !== product.id ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateCartQuantity = ( product: ICartProduct, newQuantity: number ) => {
        if(newQuantity > 0) {
            product.quantity = newQuantity;
            dispatch({ type: '[Cart] - Change cart quantity', payload: product });
        }
        if(newQuantity <= 0) {
           dispatch({ type: '[Cart] - Remove product in cart', payload: product });
        }
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: IShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('city',address.city);
        Cookie.set('country',address.country);
        Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }


    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

        if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                // size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }


        try {
            
            const orderCreated = await createOrderApi({ data:body })

            dispatch({ type: '[Cart] - Order complete' });

            return {
              hasError: false,
              message: orderCreated.id!,
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }
        }

    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,

            // Orders
            createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
};