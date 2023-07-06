const client = require('./client');

async function getAllProducts() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT *
      FROM products;
    `);

    return rows;

  } catch (error) {
    console.log("Error getting all products!", error);
    throw error;
  }
};

async function getProductById(id) {
  try {
    const { rows: [ product ] } = await client.query(/*sql*/`
      SELECT *
      FROM products
      WHERE id=$1
    `, [id]);

    return product;

  } catch (error) {
    console.log("Error getting a product by this id", error);
    throw error;
  } 
};

async function attachProductsToCart(cart) { // not needed for now, taking care of in addToCart function in cart.js
  try {
    const { rows: productInCart } = await client.query(/*sql*/`
      SELECT products.*
    `)
  } catch (error) {
    throw error;
  }
}

// For Administrator:
async function addProduct({ name, category, description, price }) {
  try {
    const { rows: [ product ] } = await client.query(/*sql*/`
      INSERT INTO products (name, category, description, price)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [ name, category, description, price ]);

    return product;

  } catch (error) {
    console.log("Error adding this product!", error);
    throw error;
  }
};

async function editProduct({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" = $${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ product ] } = await client.query(/*sql*/`
      UPDATE products
      SET ${ setString }
      WHERE id = ${ id }
      RETURNING *;
    `, Object.values(fields));

    return product;

  } catch (error) {
    console.log("Error updating the product!", error);
    throw error;
  }
};

async function removeProduct(id) {
  try {
    await client.query(/*sql*/`
      DELETE FROM cart
      WHERE "productId" = $1;
    `, [id]);

    await client.query(/*sql*/`
      DELETE FROM products
      WHERE id = $1;
    `, [id]);
    
  } catch (error) {
    console.log("Error deleting this product!", error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct
};