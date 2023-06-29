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
    
    } else {
      return[];

    }
  } catch (error) {
    console.log("error getting cart", error)
    throw error;
  }
}

async function addToCart(userId, productId, quantity){
  try {
    if(userId) {
      const { rows: [addProduct] } = await client.query(`
        INSERT INTO cart ("userId", "productId", "quantity")
        VALUES ($1, $2, $3)
        RETURNING *
      `, [userId, productId, quantity]);

      return addProduct;

    } else {
      throw new Error("User must be logged in to add items to cart");
    }

  } catch (error){
    console.log("error adding to cart", error)
    throw error;
  }
}

async function deleteFromCart(userId, productId){
    try {
        if (userId){
            const {rows: deleteProduct} = await client.query(`
                DELETE FROM cart
                WHERE userId = $1 AND productId = $2 
                `, [userId, productId]);
                return deleteProduct;
        }else{
            throw new Error ("User must be logged in to delete items");
        }
    }catch (error){
        console.log("error deleting from cart", error)
        throw error;
    }
}

async function updateCart( userId, productId, updatedQuantity ){
    try {
        if (userId){
            const {rows: updateProduct } = await client.query(
                `UPDATE cart
                SET quantity = $1
                WHERE userId = $2 AND productId = $3
                `, [updatedQuantity, userId, productId]);
                return updateProduct;
        }else {
            throw new Error ("User must be logged in to edit the cart")
        }
    }catch (error){
        console.log("error editing the cart", error)
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
// wishlist??

//notes from class 
//user.........products_cart
//1.........prod1.........cart1
//1.........prod2.........cart1
//1.........prod1.........cart2

    module.exports ={
        shoppingCart, 
        addToCart, 
        deleteFromCart,
        updateCart
    }