const client = require('./client');

    async function shoppingCart(userId) {
    try{
        if(userId){
    const {rows: cart} = await client.query(`
    SELECT products
    FROM cart
    WHERE userId = 1$
            `, [userId])
            return cart;
        }else{

            return[]
        }
        }catch (error){
            console.log("error getting cart", error)
            throw error;
        }
    }


    async function addToCart(userId, product ){
        try{
            if(userId){
        const {rows: product }= await client.query(`
        INSERT INTO cart (userId, productId)
        VAlUES ($1, $2)
        `, [userId, product])
        return updatedCart;
            } else{
                throw new Error("User must be logged in too add items to cart")
            }

    } catch (error){
        console.log("error adding to cart", error)
        throw error;
    }
}






// user logged in to cart vs non logged in user        
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