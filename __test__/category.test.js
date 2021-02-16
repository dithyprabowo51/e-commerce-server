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
    it('Success create category', async function (done) {
        await User.update({ RoleId: 1 }, { where: { id: 1 } });
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
    it('Failed, required fields is empty', async function (done) {
        await User.update({ RoleId: 1 }, { where: { id: 1 } });
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

describe('GET /categories/:CategoryId', function () {
    it('Success read category by id', async function (done) {
        newCategory = await Category.create({ name: 'Category test' });
        await User.update({ RoleId: 1 }, { where: { id: 1 } });
        request(app)
            .get('/categories/' + newCategory.id)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Success');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('Failed, no access_token', async function (done) {
        newCategory = await Category.create({ name: 'Category test' });
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .get('/categories/' + newCategory.id)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Failed, category not found', async function (done) {
        newCategory = await Category.create({ name: 'Category test' });
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .get('/categories/' + 121213)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(404);
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
});

describe('GET /categories', function () {
    it('Success read all categories', function (done) {
        request(app)
            .get('/categories')
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Success');
                expect(Array.isArray(res.body.data)).toEqual(true);
                done();
            });
    });
    it('Failed, no access_token', async function (done) {
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .get('/categories')
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
});

describe('PUT /categories/:CategoryId', function () {
    it('Success updated category', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .put('/categories/' + newCategory.id)
            .send({ name: 'category test' })
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Updated category successfully');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('Failed, required fields is empty', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .put('/categories/' + newCategory.id)
            .set({ access_token })
            .send({ name: '' })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(400);
                expect(Array.isArray(res.body.errors)).toEqual(true);
                done();
            });
    });
    it('Failed, no access_token', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .put('/categories/' + newCategory.id)
            .send({ name: 'category test' })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Failed, user role is not admin', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 2 }, { where: { id: 1 } })
        request(app)
            .put('/categories/' + newCategory.id)
            .set({ access_token })
            .send({ name: 'category test' })
            .end(async (err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, { where: { id: 1 } })
                done();
            });
    });
});

describe('DELETE /categories/:CategoryId', function () {
    it('Success deleted category', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .delete('/categories/' + newCategory.id)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Deleted category successfully');
                done();
            });
    });
    it('Failed, category not found', async function (done) {
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .delete('/categories/' + 12122334)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(404);
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
    it('Failed, no access_token', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 1 }, { where: { id: 1 } })
        request(app)
            .delete('/categories/' + newCategory.id)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Failed, user role is not admin', async function (done) {
        newCategory = await Category.create({ name: 'category test' })
        await User.update({ RoleId: 2 }, { where: { id: 1 } })
        request(app)
            .delete('/categories/' + newCategory.id)
            .set({ access_token })
            .end(async (err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, { where: { id: 1 } })
                done();
            });
    });
});