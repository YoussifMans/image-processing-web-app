import { Router, Request, Response, urlencoded, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import * as fs from 'fs/promises';

const galleryPath = path.join(__dirname, '../../../public/gallery/uploaded/');
const savePath = path.join(__dirname, '../../../public/gallery/resized/');

async function fileExists(filename: string) {
    try {
        await fs.access(path.join(savePath, filename));
        return true;
    } catch (err) {
        console.log('File does not exist or access is denied');
        console.log('More detailed error log:\n', err);
        return false;
    }
}

const resizeRouter = Router();

resizeRouter.use(
    urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }),
);
resizeRouter.use('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

resizeRouter.get('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});

resizeRouter.post('/', async (req: Request, res: Response) => {
    const { image, fileName, width, height } = req.body;

    console.log('Checking parameters');

    if (!image || !fileName || !width || !height) {
        res.status(400).send('Missing or deformed parameters.');
        return;
    }

    console.log('checking if file exists');

    if (await fileExists(fileName)) {
        res.send(path.join(savePath, fileName));
        return;
    }

    console.log('creating buffer');
    const fileBuffer = await fs.readFile(path.join(galleryPath, fileName));

    console.log('sharp magic');

    await sharp(fileBuffer)
        .resize({ width: parseInt(width), height: parseInt(req.body.height) })
        .toFile(path.join(savePath, fileName));

    console.log('sending response');

    res.send(`http://localhost:3000/gallery/resized/${fileName}`);
});

export default resizeRouter;
