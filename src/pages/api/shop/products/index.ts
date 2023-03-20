import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductResponse } from '@/features/shop';

type DataResponse = 
| { message: string }
| ProductResponse[];

export default function handler(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
    
    switch( req.method ) {
        case 'GET':
            return getProducts( req, res );
        default:
            return res.status(400).json({
                message: 'Bad request'
            });
    };
};

const getProducts = async(req: NextApiRequest, res: NextApiResponse<DataResponse>) => {

    const { tag = undefined } = req.query;

    // Usar la BD de mongo
    // let condition = {};
    //  if ( tag ) {
    //     condition = { tag };
    // }
    // await db.connect();
    // const products = await Product.find(condition)
    //                             .select('title images price inStock slug -_id')
    //                             .lean();
    // await db.disconnect();

    const products = productsDataFalse;

    return res.status(200).json( products );


}



const productsDataFalse: ProductResponse[] = [
    {
        title: 'title product test 1',
        description: 'description product test 1',
        slug: 'slug-product-test-1',
        tags: ['tag1','tag2'],
        price: 20,
        inStock: 1,
        images: ['img1','img2'],
        scene: 'urlscene',
        id: '345345345231',
        createdAt: 1,
        updatedAt: 2,
    }
];