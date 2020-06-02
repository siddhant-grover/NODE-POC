const request = require('supertest')
const app = require('../src/app')
const Cart = require('../src/models/cart')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    cartOne,
    cartTwo,
    
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create cart for user when user created ', async () => {
    const response = await request(app)
        .post('/users').send({
            name: 'Andrew',
            email: 'andrew@example.com',
            password: 'MyPass777!'
        }).expect(201)
     
        expect(response.body.cart).not.toBeNull()
    // const cart = await Cart.findById(response.body._id)
    // expect(cart).not.toBeNull()
    // expect(cart.completed).toEqual(false)
})

test('Should fetch users carts', async () => {
    const response = await request(app)
        .get('/carts/mycart')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        
        
    expect(response.body.owner).toEqual(userOneId.toString())
})


