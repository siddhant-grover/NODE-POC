const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    products: [{
        productID: {
           
        },
        Quantity:{
type:Number,

        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})



const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart