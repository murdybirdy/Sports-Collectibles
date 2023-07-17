import React, { useState, useEffect } from 'react';

function Products({ currentUser }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProducts] = useState(null);

  console.log(currentUser);
  useEffect(() => {
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

    fetchProducts();
  }, []);
const handleViewProduct =(productId) => {
  const selected = products.find((product)=> product.id === productId);
  setSelectedProducts(selected);
}
const handleGoBack = ()=> {
  setSelectedProducts(null)
}
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
       { currentUser.isAdmin ? <button>Delete Product</button> : null }
       { currentUser.isAdmin ? <button>Edit Product</button> : null }
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
