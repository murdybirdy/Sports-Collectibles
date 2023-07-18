const client = require('./client');

async function userShoppingCart(userId) {
  try{
    if (userId) {
      const { rows } = await client.query(`
        SELECT cart.*, products.name, products.category, products.description, products.price, products.image_path
        FROM cart
        INNER JOIN products
        ON cart."productId" = products.id
        WHERE cart."userId" = $1
      `, [userId])
      
      return rows;
    
    } else {
      return[];

    }
  } catch (error) {
    console.log("error getting cart by user", error)
    throw error;
  }

}

async function addToCart({userId, productId}){
  try {
    if(userId) {
      const { rows: [addProduct] } = await client.query(`
        INSERT INTO cart ("userId", "productId")
        VALUES ($1, $2)
        RETURNING *
      `, [userId, productId]);

      return addProduct;

    } else {
      throw new Error("User must be logged in to add items to cart");
    }

  } catch (error) {
    console.log("error adding to cart", error)
    throw error;
  }
}

async function deleteFromCart(cartId){
  try {
    await client.query(`
      DELETE FROM cart
      WHERE id = $1
      RETURNING *;
    `, [cartId]);

  } catch (error) {
    console.log("error deleting from cart", error)
    throw error;
  }
}

async function updateCart( userId, productId, updatedQuantity ){ // is this needed? I'm thinking that quantity will need to be updated in the front-end by counting each productId
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


async function getCartByUser(userId) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT cart.*, products.name, products.category, products.description, products.price
      FROM cart
      INNER JOIN products
      ON cart."productId" = products.id
      WHERE cart."userId" = $1
    `, [ userId ]);

    return rows;

  } catch (error) {
    console.log("Error getting cart by user!");
    throw error;
  }
}

async function showAllCartItems() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM cart;
    `);

    return rows;

  } catch (error) {
    console.log("Error showing all cart items!");
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
    userShoppingCart, 
    addToCart, 
    deleteFromCart,
    updateCart,
    getCartByUser,
    showAllCartItems
}