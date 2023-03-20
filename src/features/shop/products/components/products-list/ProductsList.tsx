import { ProductResponse } from "../../types"


export type ProductsListProps = {
    products: ProductResponse[];
    isLoading: boolean;
    tag: string;
}

export const ProductsList = ({
    products,
    isLoading,
    tag
}: ProductsListProps ) => {

    if(isLoading) return <h1>IS LOADING</h1>;

    return (
      <div id='ProductsList-component'>
        <h2>Tag: {tag ? tag : 'Ninguna etiqueta seleccionada'}</h2>
        {products && products?.length != 0
          ? products.map((product, i) => (
              <div id={`productCard-component-${i}`} key={`productCard-component-${i}`}>
                <h2>{product.title}</h2>
                <h2>{product.description}</h2>
                <h2>Price: {product.price}</h2>
                <br></br>
              </div>
            ))
          : null}
      </div>
    )

}