const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
      await client.query(/*sql*/`
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
          description VARCHAR(255) NOT NULL,
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

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
