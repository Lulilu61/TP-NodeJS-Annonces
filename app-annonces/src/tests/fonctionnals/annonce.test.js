const request = require('supertest');
const app = require('../../app');

describe('Functional Test: Annonce Routes', () => {
    it('GET /annonces devrait répondre 200', async () => {
        const res = await request(app).get('/annonces');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});