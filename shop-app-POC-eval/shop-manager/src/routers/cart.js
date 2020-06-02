const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const router = new express.Router()


//display current cart
router.get('/carts/mycart', auth, async (req, res) => {

    try {
        const cart = await Cart.findOne({owner: req.user._id })

        if (!cart) {
            return res.status(404).send()
        }

        res.send(cart)
    } catch (e) {
        res.status(501).send()
    }
})


//add more prod to cart
router.post('/carts/add', auth, async (req, res) => {
    try{
        if(Object.keys(req.body).length>2)
        {
            throw new Error()
        }
        
   const prod={
    productID:req.body.productID,
    Quantity:req.body.Quantity
}
   
 
   const cart = await Cart.findOne({owner: req.user._id })

   cart.products = cart.products.concat(prod)


   
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


//del a specific product 
router.post('/carts/remove/:prodId', auth, async (req, res) => {
    const prodId=req.params.prodId

    const cart = await Cart.findOne({owner: req.user._id })
 
 console.log(prodId)
    cart.products.forEach( async (product)=>{
      if(product.productID===prodId){
            await product.remove()

      }

    })
     
     try {
         await cart.save()
         res.status(201).send()
     } catch (e) {
         res.status(400).send(e)
     }
 })
 
//update cart 
router.patch('/carts', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    
    const allowedUpdates = ['products']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
   
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
   
    try {
        const cart = await Cart.findOne({owner: req.user._id})
        console.log(cart)
        console.log("output")
        if (!cart) {
            return res.status(404).send()
        }

        updates.forEach((update) => cart[update] = req.body[update])
        await cart.save()
        res.send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})
//clear cart 
router.delete('/carts/clear', auth, async (req, res) => {
    try {
       
   const cart = await Cart.findOne({owner: req.user._id })

   

   cart.products = []

   
    await cart.save()
    res.status(201).send(cart)

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router