// grab our db client connection to use with our adapters
const client = require('./client');
const bcrypt = require('bcrypt');

async function getAllUsers() {
  try {
    const query = 'SELECT * FROM users;';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching users from the database.');
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log('Error getting user', error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const query = 'SELECT * FROM users WHERE username = $1;';
    const result = await client.query(query, [username]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error fetching user with username ${username} from the database.`);
  }
}

async function getUserById(id) {
  try {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error fetching user with id ${id} from the database.`);
  }
}

async function createUser(username, password) {
  try {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;';
    const values = [username, password];
    const result = await client.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error('Error creating user.');
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserById,
  createUser,

};

