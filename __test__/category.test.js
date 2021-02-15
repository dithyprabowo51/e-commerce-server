const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User, Category, ProductCategory } = require('../models');
const { generateToken } = require('../helpers/jwt');

let access_token;
let newCategory;

afterAll(async done => {
    try {
        await Category.destroy({
            where: {}
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
        newCategory = await Category.create({ name: 'Category test' });
        done();
    } catch (err) {
        done();
    }
});

describe('POST /categories', function () {
    it('Success create category', function (done) {
        request(app)
            .post('/categories')
            .send({ name: 'Category test' })
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(201);
                expect(res.body.message).toEqual('Added new category successfully');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('Failed, no access_token', function (done) {
        request(app)
            .post('/categories')
            .send({ name: 'Category test' })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Failed, user role is not admin', async function (done) {
        await User.update({ RoleId: 2 }, {
            where: { id: 1 }
        });
        request(app)
            .post('/categories')
            .send({ name: 'Category test' })
            .set({ access_token })
            .end(async (err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, {
                    where: { id: 1 }
                });
                done();
            });
    });
    it('Failed, required fields is empty', function (done) {
        request(app)
            .post('/categories')
            .send({ name: '' })
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(400);
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                done();
            });
    });
});