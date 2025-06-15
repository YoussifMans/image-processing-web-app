import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import { existsSync } from 'fs';
import multer from 'multer';

const savePath = path.join(__dirname, '../../../public/gallery/resized/');

function fileExists(filename: string) {
    return existsSync(path.join(savePath, filename));
}

const resizeRouter = Router();

resizeRouter.get('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});

const upload = multer({ storage: multer.memoryStorage() });

resizeRouter.post(
    '/',
    upload.single('image'),
    (req: Request, res: Response) => {
        const file = req.file as Express.Multer.File;

        if (!file) {
            res.status(400).send('No file uploaded.');
        }

        if (fileExists(file.filename as string)) {
            res.send(
                path.join(
                    `http://localhost:3000/gallery/resized/${file.filename}`,
                ),
            );
        }

        sharp(file.buffer)
            .resize(req.body.width, req.body.height)
            .toFile(path.join(savePath, file.filename as string));

        res.send(
            path.join(`http://localhost:3000/gallery/resized/${file.filename}`),
        );
    },
);

export default resizeRouter;
