import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
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
    
    const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: "RESPUESTA FALSA DEL SERVIDOR DE CLOUDINARY JEJE" });

}

const parseFiles = async(req: NextApiRequest): Promise<string> => {

    return new Promise( (resolve, reject) => {

        console.log(req);

        const form = new formidable.IncomingForm();
        form.parse( req, async( err, fields, files ) => {
            console.log({ err, fields, files });

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file as formidable.File )
            resolve(filePath);
        })

    }) 

}


const saveFile = async( file: formidable.File ): Promise<string> => {

    // const data = fs.readFileSync( file.filepath );
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath ); // elimina
    // return;
    console.log(file);
    console.log("===========================");
    // console.log(file.filePath);
    // const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    // return secure_url;
    return new Promise(()=>"oye");

}