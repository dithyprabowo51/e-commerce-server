require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User } = require('../models');
const { generateToken } = require('../helpers/jwt');


let access_token;

afterAll(async done => {
    try {
        await Product.destroy({
            where: {}
        });
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        });
        sequelize.close();
        done();
    } catch (err) {
        sequelize.close();
        done()
    }
});

beforeAll(async done => {
    try {
        let user = await User.findOne({
            where: { email: 'admin@mail.com' }
        });
        let payload = {
            id: user.id,
            email: user.email
        }
        access_token = generateToken(payload);
        done();
    } catch (err) {
        done();
    }
});

describe('POST /products', function () {
    it('Success create new product', function (done) {
        let body = {
            name: 'Product 1',
            price: 100000,
            image_url: 'image url 1',
            stock: 10
        }
        request(app)
            .post('/products')
            .send(body)
            .set({ access_token })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.message).toEqual('Added new product successfully');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('No access_token in headers, it should return status 401', function (done) {
        let body = {
            name: 'Product 2',
            price: 100000,
            image_url: 'image url 2',
            stock: 10
        }
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Required fields is empty, it should return status 400', async function (done) {
        try {
            let body = {
                name: '',
                price: null,
                image_url: '',
                stock: null
            }
            request(app)
                .post('/products')
                .send(body)
                .set({ access_token })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toEqual(400);
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    done();
                });
        } catch (err) {
            done();
        }
    });
    it('Invalid field format, it should return status 400', async function (done) {
        try {
            let body = {
                name: 'product 3',
                price: '100000',
                image_url: '',
                stock: '10'
            }
            request(app)
                .post('/products')
                .send(body)
                .set({ access_token })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toEqual(400);
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    done();
                });
        } catch (err) {
            done();
        }
    });
    it('Stock and price must be greater than 0, it should return status 400', async function (done) {
        try {
            let body = {
                name: 'product 3',
                price: -100000,
                image_url: 'image 3',
                stock: -10
            }
            request(app)
                .post('/products')
                .send(body)
                .set({ access_token })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toEqual(400);
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    done();
                });
        } catch (err) {
            done();
        }
    });
    it('Role is not admin, it should return status 401', async function (done) {
        try {
            let body = {
                name: 'Product 2',
                price: 100000,
                image_url: 'image url 2',
                stock: 10
            }
            await User.update({ RoleId: 2 }, {
                where: { id: 1 }
            });
            request(app)
                .post('/products')
                .send(body)
                .set({ access_token })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).toEqual(401);
                    expect(res.body).toHaveProperty('message');
                    expect(res.body.message).toEqual('You have no access');
                    done();
                });
        } catch (err) {
            done();
        }
    });
});