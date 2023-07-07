// declare your model imports here
// for example, User
const {
  addProduct,
  createUser,
  addToCart,
  getAllProducts,
  getProductById,
  userShoppingCart,
  deleteFromCart,
  showAllCartItems,
  editProduct,
  removeProduct,
  getAllUsers,
  getUser,
  getUserById
} = require('./');

const client = require('./client');

const staticData = require('./staticData');
const productsToCreate = staticData.productsList();
const usersToCreate = staticData.usersList();
const cartDataToCreate = staticData.cartList();

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
          image_path VARCHAR(255),
          price INTEGER NOT NULL
        );
      `);

      await client.query(/*sql*/`
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER
        );
      `);

      // await client.query(/*sql*/`
      //   CREATE TABLE cartItems(
      //     id SERIAL PRIMARY KEY,
      //     "cartId" INTEGER REFERENCES cart(id),
      //     "productId" INTEGER REFERENCES products(id),
      //   );
      // `);

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  // create useful starting data by leveraging your
  // Model.method() adapters to seed your db, for example:
  // const user1 = await User.createUser({ ...user info goes here... })

  try {
  // Products Tests:
    console.log("Starting to create products...");
    const products = await Promise.all(productsToCreate.map(addProduct));
    console.log("Products created:", products);

    console.log("Displaying product by Id:", await getProductById(products[2].id));
    console.log("Updated that product by Id", await editProduct({
        id: products[2].id,
        category: "test category",
        price: 1000000000
      }));

    // console.log("Testing removing a product by Id: 1");
    // await removeProduct(1);
    console.log("Displaying all products after removing that one:", await getAllProducts());
    


  // Users Tests:
    console.log("Starting to create users...");
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:", users);

    console.log("Getting user by username/password:", await getUser({username: 'a', password: 'password'}));
    console.log("Getting user by Id:", await getUserById(users[0].id));
    console.log("Getting user with incorrect password:", await getUser({username: 'a', password: 'wrongpassword'}));
    console.log("Getting user with nonexistent Id:", await getUserById(5000));
    console.log("Getting all users:", await getAllUsers());
    
  // Cart Tests:
    console.log("Starting to add products to cart...");
    const cart = await Promise.all(cartDataToCreate.map(addToCart));
    console.log("Products added:", cart);

    console.log("Getting cart by userId...");
    const userCart = await userShoppingCart(users[2].id);
    console.log("Cart:", userCart);

    console.log("Deleting item from cart...");
    await deleteFromCart(cart[1].id);
    const updatedCart = await showAllCartItems();
    console.log("Updated Cart Items:", updatedCart);
    console.log("Updated User Cart:", await userShoppingCart(users[2].id));

  } catch (error) {
    console.log("Error populating Initial Data!", error);
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
