import { uid } from "@/utils/uid";
import { IProductModel } from "./types";


interface SeedData {
    // users: SeedUser[];
    products: IProductModel[];
}





export const initialData: SeedData = {
    // users: [
    //     {
    //         name: 'Fernando Herrera',
    //         email: 'fernando@google.com',
    //         password: bcrypt.hashSync('123456'),
    //         role: 'admin'
    //     },
    //     {
    //         name: 'Eduardo Rios',
    //         email: 'eduardo@google.com',
    //         password: bcrypt.hashSync('123456'),
    //         role: 'client'
    //     },
    // ],
    products: [
        {
            title: 'title product test 1',
            description: 'description product test 1',
            slug: 'slug-product-test-1',
            tags: ['tag1','tag2'],
            price: 20,
            inStock: 1,
            images: ['img/waternormals.jpeg','img/waternormals.jpeg'],
            scene: 'urlscene',
            id: '51f5gg9siff08t4cn0jivpu', //uid() no lo usamos porque si no hay incongruencias cuando se recarga la pagina y los productos tienen distintos id de los guardado en las cookies (carrito de compra)
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ]
}
