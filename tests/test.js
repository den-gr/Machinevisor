const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const supertest = require('supertest');
const server = require('../backend/bin/app');
const requestWithSupertest = supertest(server);

it('GET / default check', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toEqual(200);
});

describe('User Endpoints',  () => {
    it('GET /users/:id should show a user', async () => {
        let res = await requestWithSupertest.get('/users/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user_id', 'name', 'surname')
    });

    it('Get /users/:id where id is not a number should return 400 code', async () => {
        let res = await requestWithSupertest.get('/users/word')
        expect(res.statusCode).toEqual(400);
    });

    it('Get /users/:id should return 404 if user is not found', async () => {
        let res = await requestWithSupertest.get('/users/999999')
        expect(res.statusCode).toEqual(404);
    });
});

describe('Machines Endpoints',  () => {
    it('GET /machines/:id should show a machine', async () => {
        let res = await requestWithSupertest.get('/machines/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('machine_id', 'brand', 'last_revision', "production_year")
    });

    it('GET /:machineId should return 404 if machine si not found', async () => {
        const res = await requestWithSupertest.get('/machines/999999');
        expect(res.status).toEqual(404);
    });

    it('GET /:machineId should return 400 id is not a number', async () => {
        const res = await requestWithSupertest.get('/machines/word');
        expect(res.status).toEqual(400);
    });
});