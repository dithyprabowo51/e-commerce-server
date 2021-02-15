const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

afterAll(done => {
    sequelize.close();
    done();
})

describe('POST /login', function () {
    it('Success login. It should return data and access_token', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@mail.com', password: '123456' })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body).toHaveProperty('access_token');
                expect(res.body.message).toEqual('Login successfully');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('It should return bad request response that email valid but password invalid', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@mail.com', password: '12345' })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid email or password');
                done();
            });
    });
    it('It should return bad request response that no email in database', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'noemail@mail.com', password: '123456' })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid email or password');
                done();
            });
    });
    it('It should return bad request response that email is empty and password is empty', function (done) {
        request(app)
            .post('/login')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid email or password');
                done();
            });
    });
});