const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const cartRouter = require('./routers/cart')
const productRouter=require('./routers/product')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(cartRouter)
app.use(productRouter)



module.exports = app