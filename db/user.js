// grab our db client connection to use with our adapters
const client = require('./client');

async function getAllUsers() {
  try {
    const query = 'SELECT * FROM users;';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching users from the database.');
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

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUserById

};
