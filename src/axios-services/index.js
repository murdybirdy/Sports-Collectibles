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

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

  // Cart functions

export async function getCartItemsByUser(userId, token) {
  try {
    const response = await fetch(`/api/cart/${userId}`, {
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
    const response = await fetch(`/api/cart/${itemId}`, {
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
    const response = await fetch(`/api/cart/${userId}/${product.id}`, {
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
    const response = await fetch('/api/products', {
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
    const response = await fetch(`/api/products`, {
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
    const response = await fetch(`/api/products/${productId}`, {
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
    const response = await fetch(`/api/products/${productId}`, {
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
    const response = await fetch('/api/users/login', {
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
    const response = await fetch('/api/users/register', {
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