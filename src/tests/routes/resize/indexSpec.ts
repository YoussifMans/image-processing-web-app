import app from '../../..';
import supertest from 'supertest';

const requestApp = supertest(app);

describe('Testing the resize /resize endpoint', () => {
    it('GET /resize returns a 404', async () => {
        expect((await requestApp.get('/resize')).status).toEqual(404);
    });
});
