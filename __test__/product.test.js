require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User } = require('../models');
const { generateToken } = require('../helpers/jwt');


let access_token;

afterAll(done => {
    Product.destroy({
        where: {}
    })
        .then(() => {
            sequelize.close();
            done();
        })
        .catch(() => {
            sequelize.close();
            done();
        })
});

beforeAll(async done => {
    let user = await User.findOne({
        where: { email: 'admin@mail.com' }
    });
    let payload = {
        id: user.id,
        email: user.email
    }
    access_token = generateToken(payload);
    done();
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
});