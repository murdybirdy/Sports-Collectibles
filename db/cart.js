const client = require('./client');

    async function shoppingCart(userId) {
    try{
    const {rows: cart} = await client.query(`
    SELECT products
    FROM cart
    WHERE userId = 1$
            `, [userId])
            return cart;

        }catch (error){
            console.log("error getting cart", error)
            throw error;
        }
    }


    async function addToCart(userId, product ){
        try{
        const {rows: product }= await client.query(`
        INSERT INTO cart (userId, productId)
        VAlUES ($1, $2)
        `, [userId, product])
        return updatedCart;
    } catch (error){
        console.log("error adding to cart", error)
        throw error;
    }
}
        
//add to cart
//remove from cart
//update cart
//get cart total product/price 
//check out 
// user authentication 

    module.exports ={
        shoppingCart, 
        addToCart, 
    }