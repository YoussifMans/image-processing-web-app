import app from '../../..';
import supertest from 'supertest';

const requestApp = supertest(app);

describe('Testing the upload /upload endpoint', () => {
    it('Expects to get an array of strings from GET /upload and for it to return 200 OK', async () => {
        const response = await requestApp.get('/upload');

        expect(response.status).toBe(200);
    });
});
