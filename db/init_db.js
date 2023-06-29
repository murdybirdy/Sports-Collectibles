// declare your model imports here
// for example, User
const {
  addProduct,
  createUser,
  addToCart,
  getAllProducts
} = require('./');
const client = require('./client');

const staticData = require('./staticData');
const productsToCreate = staticData.productsList();
const usersToCreate = staticData.usersList();

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
      await client.query(/*sql*/`
        DROP TABLE IF EXISTS cartItems;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
      `);

    // build tables in correct order
      await client.query(/*sql*/`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `);

      await client.query(/*sql*/`
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          category VARCHAR(255) NOT NULL,
          description VARCHAR(500) NOT NULL,
          price INTEGER NOT NULL
        );
      `);

      await client.query(/*sql*/`
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER,
          UNIQUE ("userId", "productId")
        );
      `);
      await client.query(/*slq*/`
      CREATE TABLE cartItems(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES cart(id),
        "productId" INTEGER REFERENCES product(id),
      );
      `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Starting to create products...");
    const products = await Promise.all(productsToCreate.map(addProduct));
    console.log("Products created:", products);

    console.log("Starting to create users...");
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:", users);

    // console.log("starting to add products to cart...");
    // const cart = await addToCart(users[0].id, products[0]);
    // console.log("Products added:", cart);

    console.log(await getAllProducts());
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.log("Error populating Initial Data!", error);
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
