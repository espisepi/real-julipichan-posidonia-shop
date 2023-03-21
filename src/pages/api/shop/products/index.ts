import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductResponse } from '@/features/shop';
import { initialData } from '@/backend';

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

    const products = initialData.products;

    return res.status(200).json( products );


}