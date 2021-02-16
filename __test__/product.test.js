const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User, Category, ProductCategory } = require('../models');
const { generateToken } = require('../helpers/jwt');


let access_token;
let category;
let newProduct;

afterAll(async done => {
    try {
        await Product.destroy({
            where: {}
        });
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
        category = await Category.create({ name: 'Category test' });
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        await ProductCategory.create({
            ProductId: newProduct.id,
            CategoryId: category.id
        });
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
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, {
                    where: { id: 1 }
                })
                done();
            });
    });
});

describe('GET /products', function () {
    it('It should return all data products', function (done) {
        request(app)
            .get('/products')
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(Array.isArray(res.body)).toEqual(true);
                done();
            });
    });
    it('It should return data products by category', function (done) {
        request(app)
            .get('/products')
            .set({ access_token })
            .query({ CategoryId: category.id })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(Array.isArray(res.body)).toEqual(true);
                done();
            });
    });
    it('Read product by category not found', function (done) {
        request(app)
            .get('/products')
            .set({ access_token })
            .query({ CategoryId: 100000000 })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(404);
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
});

describe('GET /products/:ProductId', function () {
    it('Success. It should return a product', function (done) {
        request(app)
            .get('/products/' + newProduct.id)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.message).toEqual('Success');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('Failed. A product not found', function (done) {
        request(app)
            .get('/products/' + 10000000)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(404);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
    it('Failed. No access token', function (done) {
        request(app)
            .get('/products/' + newProduct.id)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
});

describe('PATCH /products/:ProductId set category for product', function () {
    it('Success updated', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        category = await Category.create({ name: 'Category test' });
        request(app)
            .patch('/products/' + newProduct.id)
            .set({ access_token })
            .send({ CategoryId: category.id })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Set category successfully');
                done();
            });
    });
    it('No category in database', function (done) {
        request(app)
            .patch('/products/' + newProduct.id)
            .set({ access_token })
            .send({ CategoryId: 1000000000000 })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(404);
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
    it('No send access_token', function (done) {
        request(app)
            .patch('/products/' + newProduct.id)
            .send({ CategoryId: category.id })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('User role is not admin', async function (done) {
        await User.update({ RoleId: 2 }, {
            where: { id: 1 }
        });
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        request(app)
            .patch('/products/' + newProduct.id)
            .set({ access_token })
            .send({ CategoryId: category.id })
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, {
                    where: { id: 1 }
                })
                done();
            });
    });
});

describe('PUT /products/:ProductId', function () {
    it('Success update product', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        let body = {
            name: 'Product name edit',
            price: 100000,
            image_url: 'Image edit',
            stock: 10
        }
        request(app)
            .put('/products/' + newProduct.id)
            .set({ access_token })
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Updated product successfully');
                expect(typeof res.body.data).toEqual('object');
                done();
            });
    });
    it('Failed, stock and price less than 0', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        let body = {
            name: 'Product name edit',
            price: -100000,
            image_url: 'Image edit',
            stock: -10
        }
        request(app)
            .put('/products/' + newProduct.id)
            .set({ access_token })
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(400);
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                done();
            });
    });
    it('Failed, required fields is empty', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        });
        let body = {
            name: '',
            price: null,
            image_url: '',
            stock: null
        }
        request(app)
            .put('/products/' + newProduct.id)
            .set({ access_token })
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(400);
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                done();
            });
    });
    it('Failed, no access_token', function (done) {
        let body = {
            name: 'Product name edit',
            price: 100000,
            image_url: 'image edit',
            stock: 10
        }
        request(app)
            .put('/products/' + newProduct.id)
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Invalid token');
                done();
            });
    });
    it('Failed, User role is not admin', async function (done) {
        let body = {
            name: 'Product name edit',
            price: 100000,
            image_url: 'image edit',
            stock: 10
        }
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        });
        await User.update({ RoleId: 2 }, {
            where: { id: 1 }
        });
        request(app)
            .put('/products/' + newProduct.id)
            .send(body)
            .set({ access_token })
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(401);
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, {
                    where: { id: 1 }
                });
                done();
            });
    });
});

describe('DELETE /products/:ProductId', function () {
    it('Failed, id product not found', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        request(app)
            .delete('/products/' + 1000000)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(404);
                expect(res.body.message).toEqual('Data not found');
                done();
            });
    });
    it('Failed, no access_token', function (done) {
        request(app)
            .delete('/products/' + newProduct.id)
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
        })
        request(app)
            .delete('/products/' + newProduct.id)
            .set({ access_token })
            .end(async (err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual('You have no access');
                await User.update({ RoleId: 1 }, {
                    where: { id: 1 }
                })
                done();
            });
    });
    it('Success delete product', async function (done) {
        await User.update({ RoleId: 1 }, {
            where: { id: 1 }
        })
        newProduct = await Product.create({
            name: 'product test',
            price: 100000,
            image_url: 'image test',
            stock: 10
        })
        request(app)
            .delete('/products/' + newProduct.id)
            .set({ access_token })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(res.body.message).toEqual('Deleted product successfully');
                done();
            });
    });
});