import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import { existsSync } from 'fs';

const galleryPath = path.join(__dirname, '../../../public/gallery/uploaded/');
const savePath = path.join(__dirname, '../../../public/gallery/resized/');

function fileExists(filename: string) {
    return existsSync(path.join(savePath, filename));
}

const resizeRouter = Router();

resizeRouter.get('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});

resizeRouter.post('/', (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    sharp(req.file?.buffer)
        .resize(req.body.width, req.body.height)
        .toFile(path.join(savePath, (req.file?.filename as string)));

    res.send(path.join(`http://localhost:3000/gallery/resized/${req.file?.filename}`))
});
