// Imports
import express, { Response, Request } from 'express';
import cors from 'cors';

import uploadRouter from './routes/upload';
import resizeRouter from './routes/resize';

// Initializing constants
const app = express();
const port = 3000;

// CORS Middleware
app.use(cors());
app.use(express.static('public'));

// GET / and POST / requests (not to be used)
app.get('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot GET /. Please try /gallery or /resize');
});

app.post('/', (req: Request, res: Response) => {
    res.status(404).send('Cannot POST /. Please try /gallery or /resize');
});

// Routers
//   Upload Router
app.use('/upload', uploadRouter);
//   Resize Router
app.use('/resize', resizeRouter);

// Starting server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
