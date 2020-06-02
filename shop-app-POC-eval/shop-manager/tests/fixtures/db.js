const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Cart = require('../../src/models/cart')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const cartOne = {
    _id: new mongoose.Types.ObjectId(),
    products:[],
    owner: userOne._id
}

const cartTwo = {
    _id: new mongoose.Types.ObjectId(),
    products:[],
    owner: userTwo._id
}



const setupDatabase = async () => {
    await User.deleteMany()
    await Cart.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Cart(cartOne).save()
    await new Cart(cartTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    cartOne,
    cartTwo,
   
    setupDatabase
}