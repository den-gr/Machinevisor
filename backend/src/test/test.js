const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../test.env') });
const supertest = require('supertest');
const server = require('../../bin/app');
const requestWithSupertest = supertest(server);
let token 
beforeAll(async () =>{
    let payload = {
        email: "homer@unibo.it",
        password: "admin"
    }
    let res = await requestWithSupertest.post("/auth/sign_in").send(payload);
    token = res.body.token
})


it('GET /test default check', async () => {
    const res = await requestWithSupertest.get('/test');
    expect(res.status).toEqual(200);
});

describe('User Endpoints',  () => {
    it('GET /users/:id should show a user', async () => {
        let res = await requestWithSupertest.get('/users/1').set("authorization", "Bearer "+ token)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('surname')
        expect(res.body).toHaveProperty('img_uri')
        expect(res.body).not.toHaveProperty('auth')
        expect(res.body).not.toHaveProperty('_id')
    });

    it('Get /users/:id where id is not a number should return 400 code', async () => {
        let res = await requestWithSupertest.get('/users/word').set("authorization", "Bearer "+ token)
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error_name')
    });

    it('Get /users/:id should return 404 if user is not found', async () => {
        let res = await requestWithSupertest.get('/users/999999').set("authorization", "Bearer "+ token)
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message')
    });
});

describe('Machines Endpoints',  () => {
    it('GET /machines/:id should show a machine', async () => {
        let res = await requestWithSupertest.get('/machines/1').set("authorization", "Bearer "+ token)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('machine_id')
        expect(res.body).toHaveProperty('brand')
        expect(res.body).toHaveProperty('last_revision')
        expect(res.body).toHaveProperty("production_year")
        expect(res.body).toHaveProperty("modalities")
        expect(res.body).toHaveProperty('img_uri')
    });

    it('GET /:machineId should return 404 if machine is not found', async () => {
        const res = await requestWithSupertest.get('/machines/999999').set("authorization", "Bearer "+ token);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('message')
    });

    it('GET /:machineId should return 400 id is not a number', async () => {
        const res = await requestWithSupertest.get('/machines/word').set("authorization", "Bearer "+ token);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message')
    });

    it('GET /machines should return a list of machines', async () => {
        const res = await requestWithSupertest.get('/machines').set("authorization", "Bearer "+ token);
        expect(res.status).toEqual(200);
    });
});


describe("Authentification endpoing", () => {
    it("POST /auth/sign_up of already existing username record must return confilict http code", async () => {
        let payload = {
            name: "Vitya",
            surname: "Bobik",
            birth_date: "2001/12/05",
            email: "homer@unibo.it",
            password: "mypass" 
        }
        const res  = await requestWithSupertest.post("/auth/sign_up").send(payload);
        expect(res.status).toEqual(400); //wrong password format
        payload.password = "1Mypasss";
        const res2  = await requestWithSupertest.post("/auth/sign_up").send(payload);
        expect(res2.status).toEqual(409); //conflict
    });

    it("try log in with /auth/sign_in and logout with /auth/logout", async () => {
        let payload = {
            email: "homer@unibo.it",
            password: "admin"
        }
        let res  = await requestWithSupertest.post("/auth/sign_in").send(payload);
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty("token")
    });
});