import { createStore, useStore } from 'zustand';
import { ICart, ICartProduct, ICartStore } from '../types';

import { uid } from '@/utils/uid';
import { IOrder } from '../../orders/types/IOrder';
import { createOrder } from '../../orders/api/create-order';

import axios from 'axios';
import Cookie from 'js-cookie';

// IMPORTANTE !!!!! ESTA CLASE NO SE UTILIZA EN EL PROYECTO !!!!!!!!!!!!!!!!!!!!!!

    // cart: ICart;

    // // Los metodos (de logica de negocio) lo pongo aqui en la store en vez de en ICart, porque es cuando defino la store, el momento en el que defino estos metodos

    // // Methods manipulate Cart
    // addProductToCart: (product: ICartProduct) => void;
    // updateCartQuantity: (product: ICartProduct) => void;
    // removeCartProduct: (product: ICartProduct) => void;
    // updateAddress: (address: IShippingAddress) => void;

    // // Methods manipulate Orders
    // createOrder: (address: IShippingAddress) => void;

    //     isLoaded: boolean;
    // products: ICartProduct[];
    // numberOfItems: number;
    // subTotal: number;
    // tax: number;
    // total: number;

    // shippingAddress?: IShippingAddress;

const CART_INITIAL_STATE: ICart = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ):  {
        id: uid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        products: [],
        numberOfItems: 0,
        subTotal: 0.0,
        tax: 0.0,
        total: 0.0,
        shippingAddress: undefined,
}


export const cartStore = createStore<ICartStore>((set, get) => ({
    cart: CART_INITIAL_STATE,
    addProductToCart: (productCart) => {
        const state = get();
        const productInCart = state.cart.products.some( p => p.id === productCart.id);
        if (!productInCart) {
            set((state) => ({
                cart: {
                    ...state.cart,
                    products: [
                        ...state.cart.products,
                        productCart
                    ]
                },
            }));
        } else {
            set((state) => ({
                cart: {
                    ...state.cart,
                    products: state.cart.products.map(
                        (p) => {
                            if(p.id === productCart.id) {
                                return {
                                    ...p,
                                    quantity: p.quantity + 1,
                                };
                            } else {
                                return { ...p };
                            };
                        }
                    ),
                },
            }));
        }
        
        get().updateCartInternalValues();
    },
    updateCartQuantity: (productCart, newQuantity) => {
        const newQuantityFiltered = newQuantity <= 0 ? 0 : newQuantity;
        set((state) => ({
            cart: {
                ...state.cart,
                products: state.cart.products.map(
                    (p) => {
                        if(p.id === productCart.id) {
                            return {
                                ...p,
                                quantity: newQuantityFiltered,
                            };
                        } else {
                            return { ...p };
                        };
                    }
                ),
            }
        }));
        get().updateCartInternalValues();
    },
    removeCartProduct: (productCart) => {
        // Reducer: Cambiar el estado
        set((state) => ({
            cart: {
                ...state.cart,
                products: state.cart.products.filter(
                    (p) => {
                        !(p.id === productCart.id)
                    }
                ),
            }
        }));
        get().updateCartInternalValues();
    },
    updateAddress: (address) => {
        // Logica de negocio
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('city',address.city);
        Cookie.set('country',address.country);
        Cookie.set('phone',address.phone);

        // Reducer: Cambiar el estado
        set((state) => ({
            cart: {
                ...state.cart,
                shippingAddress: address
            }
        }));
        get().updateCartInternalValues();
    },
    createOrder: async () => {

        // Hay que actualizar los parametros del carrito de precio total y todo cuando se modifica en todos los metodos anteriores
        get().updateCartInternalValues();

        const state = get();
        if ( !state.cart.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.products,
            shippingAddress: state.cart.shippingAddress,
            numberOfItems: state.cart.numberOfItems,
            subTotal: state.cart.subTotal,
            tax: state.cart.tax,
            total: state.cart.total,
            isPaid: false
        }


        try {
            
            const orderCreated = await createOrder({data: body});

            return {
                hasError: false,
                message: orderCreated.id!
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

    },
    updateCartInternalValues: () => {
        set((state) => {
            if(state.cart?.products?.length != 0) {
                console.log(state.cart.products)
                const numberOfItems = state.cart.products.reduce( ( prev, current ) => current.quantity + prev , 0 );
                const subTotal = state.cart.products.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
                const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
            
                const orderSummary = {
                    numberOfItems,
                    subTotal,
                    tax: subTotal * taxRate,
                    total: subTotal * ( taxRate + 1 )
                }
                return {
                    cart: {
                        ...state.cart,
                        ...orderSummary,
                    }
                }
            }
        });
        const state = get();
        Cookie.set('cart', JSON.stringify( state.cart ));
        console.log("OYEE UPDATE CARRITO");
        console.log(state.cart);
    },
}));


export const useCartStore = () => {
    return useStore(cartStore);
}