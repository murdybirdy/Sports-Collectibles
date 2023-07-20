import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

DATABASE_URL = "postgres://sporty_o60b_user:OiVRMDz7Him1zbOzS2xfolopNeglw4j6@dpg-cis6vdliuie5eb8l52o0-a.oregon-postgres.render.com/sporty_o60b"

export async function getAPIHealth() {
  try {
    const { data } = await axios.get(`${DATABASE_URL}/api/health`);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

  // Cart functions

export async function getCartItemsByUser(userId, token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/cart/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function deleteFromCart(itemId, token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'appplication/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function addItemToCart(userId, product, token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/cart/${userId}/${product.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(
        product
      )
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

  // Product functions
export async function getAllProducts(token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const productsData = await response.json();
    console.log(productsData);
    return(productsData);

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function createProduct(product, token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/products`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        product
      )
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function updateProduct(productId, token, product) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/products/${productId}`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        product
      )
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function deleteProduct(productId, token) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

  // User functions
export async function getUser(username, password) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function addUser(username, password, isAdmin) {
  try {
    const response = await fetch(`${DATABASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, isAdmin }),
    });

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
