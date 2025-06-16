import { Router, Request, Response, urlencoded } from 'express';
import sharp from 'sharp';
import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const galleryPath = path.join(__dirname, '../../../public/gallery/uploaded/');
const savePath = path.join(__dirname, '../../../public/gallery/resized/');

function fileExists(filename: string) {
    return existsSync(path.join(savePath, filename));
}

const resizeRouter = Router();

resizeRouter.use(urlencoded({ extended: true, type: "application/x-www-form-urlencoded" }));

resizeRouter.get('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});

resizeRouter.post('/', (req: Request, res: Response) => {
    const fileBuffer = readFileSync(
        path.join(galleryPath, req.body.fileName),
    ).buffer;

    if (
        !req.body.fileName ||
        !req.body.image ||
        !req.body.width ||
        !req.body.height
    ) {
        res.status(400).send('Missing Parameters');
        return;
    }

    if (fileExists(req.body.fileName as string)) {
        res.status(400).send(
            path.join(
                `http://localhost:3000/gallery/resized/${req.body.fileName}`,
            ),
        );
        return;
    }

    writeFileSync(path.join(savePath, req.body.fileName), '', 'utf8');

    sharp(fileBuffer)
        .resize(parseInt(req.body.width), parseInt(req.body.height))
        .toFile(path.join(savePath, req.body.fileName as string));

    console.log(req.body);

    res.send(path.join(savePath, req.body.fileName));
    return;
});

export default resizeRouter;
