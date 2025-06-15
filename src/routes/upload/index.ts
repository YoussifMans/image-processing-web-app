// Imports
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { FileFilterCallback } from 'multer';
import path from 'path';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';

// Declaring the gallery path dynamically
const galleryPath = path.join(__dirname, '../../../public/gallery/uploaded/');

async function getFiles(): Promise<string[]> {
    return await readdir(galleryPath);
}

function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
) {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }

    if (existsSync(path.join(galleryPath, file.originalname))) {
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, galleryPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadRouter = Router();

uploadRouter.post(
    '/',
    upload.single('image'),
    async (req: Request, res: Response) => {
        console.log(req.body);
        console.log(req.file);
        res.send(await getFiles());
    },
);

uploadRouter.get('/', async (req: Request, res: Response) => {
    res.send(await getFiles());
});

export default uploadRouter;
