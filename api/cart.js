const express = require('express');
const { cart, product } = require('../db');
const router = express.Router();

//Set up a new cart 
router.use((req, res, next) => {
    if (!req.session.cart){
        req.session.cart = []
    }
    next()
})

const userCart = async (id) => {
    //get the cart from the db
    const cartItems = await cartItems({
        where: {
            userId: id,
        },
        include:[{
            product: product,
        }]
    })
    return cartItems 
}

//GET /api/cart
//get the cart

router.get('/', async (res, req, next)=> {
    if (!req.user){
return (error)
    }else {
        const cartItems = await getCart
    }
})




module.exports = router; 