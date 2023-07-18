import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products({ currentUser, token, setCurrentProduct }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProducts] = useState(null);

  // console.log(currentUser);
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewProduct = (productId) => {
    const selected = products.find((product)=> product.id === productId);
    setSelectedProducts(selected);
  };

  const handleGoBack = () => {
    setSelectedProducts(null);
  };

  const handleDelete = async (productId, token) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      setSelectedProducts(null);
      fetchProducts();

    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  
  if (selectedProduct) {
    return (
      <div className="invProducts">
        <h2 className="productName">{selectedProduct.name}</h2>
        <p className= "productDiscription">{selectedProduct.description}</p>
        <img className="images" src={selectedProduct.image_path} alt={selectedProduct.name} height="500" width="300" />
        <p className="price">Price: ${selectedProduct.price}</p>
       <button onClick={handleGoBack}> Back to Products</button>
       { currentUser.isAdmin ? <button onClick={() => handleDelete(selectedProduct.id, token)}>Delete Product</button> : null }
       { currentUser.isAdmin ? <Link to="/editProduct"><button onClick={() => {setCurrentProduct(selectedProduct)}}>Edit Product</button></Link> : null }
      </div>
    );
  }

  return (
    <><h2 className="productsTitle"> Product Inventory</h2><div className="productContainer">
      
      {products.map((product) => (
        <div className="invProducts" key={product.id}>
          <h3 className="productName">{product.name}</h3>
          <p className= "productDiscription">{product.description}</p>
          <img className="images" src={product.image_path} height="500" width="300" />
          <p className="price">Price: ${product.price}</p>
          <button className="viewProduct"onClick={() => handleViewProduct(product.id)}> View Item </button>
          <button className="addToCart">Add To Cart</button>
        </div>
      ))}
    </div></>
  );
}

export default Products;
