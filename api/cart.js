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
    const cartItems = await cartItems.findAll({
        where: {
            userId: id,
        },
        include:[{
            item: product,
        }]
    })
    return cartItems 
}

//GET /api/cart
//get the cart

router.get('/', async (res, req, next)=> {
    if (!req.user){
return res.statusCode(401).json({error: 'User Not Authenticated'});
    }else {
        try{
        const cartItems = await userCart(req.user.id);
        //res.json-sends cartItems array back to the client as a json response
        res.json(cartItems)
        } catch (error){
            next(error)
        }
    }
})




module.exports = router; 