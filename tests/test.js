const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const supertest = require('supertest');
const server = require('../backend/bin/app');
const requestWithSupertest = supertest(server.app);




describe('User Endpoints',  () => {
    afterAll(() => { 
         server.listener.close(); 
    });

    it('GET / should show all users', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);
    });

    it('GET /users/:id should show a user', async () => {
        console.log("Before");
        let res = await requestWithSupertest.get('/users/1')
        console.log("After");
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