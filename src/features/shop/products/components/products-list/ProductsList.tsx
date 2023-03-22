import { ICartProduct } from '@/features/shop/cart/types'
import { ProductResponse } from '../../types'
import { productResponseToCartProductConverter } from '@/converters/productResponseToCartProductConverter'
import { useContext, useEffect } from 'react'
import { CartContext } from '@/features/shop/cart'
import { useProducts } from '../../api'

export type ProductsListProps = {
  tag: string
}

export const ProductsList = ({ tag }: ProductsListProps) => {
  
  const {
    data: products,
    isLoading,
    refetch,
  } = useProducts({
    params: {
      tag: tag,
    },
  })

  useEffect(() => {
    if (products) {
      // Ejecutamos la peticion al api endpoint con react-query
      refetch()
    }
  }, [])

  const { addProductToCart } = useContext(CartContext)

  if (isLoading) return <h1>IS LOADING</h1>

  return (
    <div id='ProductsList-component'>
      <h2>Tag: {tag ? tag : 'Ninguna etiqueta seleccionada'}</h2>
      {products && products?.length != 0
        ? products.map((product, i) => (
            <div id={`productCard-component-${i}`} key={`productCard-component-${i}`}>
              <h2>{product.title}</h2>
              <h2>{product.description}</h2>
              <h2>Price: {product.price}</h2>
              <button onClick={(e) => addProductToCart(productResponseToCartProductConverter({ product }))}>
                {' '}
                Agregar al carrito{' '}
              </button>
            </div>
          ))
        : null}
    </div>
  )
}
