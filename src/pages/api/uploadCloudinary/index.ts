import type { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable';
// import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY_URL } from '@/constants';


cloudinary.config( CLOUDINARY_URL );


type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}


const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    // const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: "RESPUESTA FALSA DEL SERVIDOR DE CLOUDINARY JEJE" });

}