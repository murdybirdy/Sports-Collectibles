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
        //error handler for non authenitacted user 
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

//Add products to the cart //Post // do we want to make a non logged in shopper experience?
router.post('/', async (req, res, next) => {
    try {
      const { itemId, quantity } = req.body;
  
      // Add the item to the cart
      const newItem = await cart.create({
        userId: req.user.id,
        itemId,
        quantity,
      });
  
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  });
  
// DELETE items from cart 
// need middleware for user authentication if we choose too 
router.delete('/itemId', async (req, res, next ) =>{
    try {
        const {itemId} = req.params;
        const deleteItem = await cart.delete({
            where:{
                id:itemId,
                userId: req.user.id
            }
        });
         if(deleteItem === 0) {
            return (error)
         }
         res.json({ message:'Item deleted from cart'})
    }catch (error){
        next (error)
    }
})


module.exports = router; 