import app from '..';
import supertest from 'supertest';

const requestApp = supertest(app);

describe('Testing the root / endpoint', () => {
    it('GET / returns a 404', async () => {
        expect((await requestApp.get('/')).status).toEqual(404);
    });
    it('POST / returns a 404', async () => {
        expect((await requestApp.post('/')).status).toEqual(404);
    });
});
