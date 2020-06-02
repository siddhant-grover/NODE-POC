const express = require('express')

const router = new express.Router()

const data = require('../hardcoded_products/Product.json')

router.get('/products', async (req, res) => {
    
    res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})
module.exports = router



