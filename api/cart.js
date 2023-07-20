const express = require('express');
const { cart, product, userShoppingCart, addToCart, deleteFromCart } = require('../db');
const router = express.Router();

//Set up a new cart 
// router.use((req, res, next) => {
//     if (!req.session.cart){
//         req.session.cart = []
//     }
//     next()
// })

// const userCart = async (id) => {
//     //get the cart from the db
//     const cartItems = await cartItems.findAll({
//         where: {
//             userId: id,
//         },
//         include:[{
//             item: product,
//         }]
//     })
//     return cartItems 
// }

//GET /api/cart
//get the cart

router.get('/:userId', async (req, res, next)=> {
    console.log("made it to :/userId route", req);
    const { userId } = req.params;
    // if (!req.user){
    //     //error handler for non authenitacted user
    //     return res.statusCode(401).json({error: 'User Not Authenticated'});
    // } else {
        try {
            const cartItems = await userShoppingCart(userId);
            //res.json-sends cartItems array back to the client as a json response
            res.send(cartItems);
        } catch (error) {
            next(error)
        }
    // }
});

//Add products to the cart //Post // do we want to make a non logged in shopper experience?
router.post('/:userId/:productId', async (req, res, next) => {
    const { userId, productId } = req.params;
    try {
      // Add the item to the cart
      const newItem = await addToCart({
        userId: userId,
        productId: productId
      });
  
      res(newItem);
    } catch (error) {
      next(error);
    }
  });
  
// DELETE items from cart 
// need middleware for user authentication if we choose too 
router.delete('/:itemId', async (req, res, next ) =>{
    try {
        const { itemId } = req.params;
        await deleteFromCart(itemId);
        console.log(`Item ${itemId} deleted from cart`)

        res.json({ message:'Item deleted from cart'})
    } catch (error){
        next (error)
    }
})


module.exports = router; 
