import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, getAllProducts, deleteProduct } from '../axios-services';

function Products({ currentUser, token, setCurrentProduct }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProducts] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setProducts(await getAllProducts(token));
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
    await deleteProduct(productId, token);
    setSelectedProducts(null);
    fetchProducts();
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
       { currentUser.isAdmin ? <button onClick={() => { setCurrentProduct(selectedProduct), navigate("/editProduct") }}>Edit Product</button> : null }
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
          <button className="viewProduct" onClick={() => handleViewProduct(product.id)}> View Item </button>
          <button className="addToCart" onClick={async () => await addItemToCart(currentUser.id, product, token)}>Add To Cart</button>
        </div>
      ))}
    </div></>
  );
}

export default Products;
