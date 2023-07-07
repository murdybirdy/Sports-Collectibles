import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="productsTitle"> Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3 className="productName">{product.name}</h3>
          <p>{product.description}</p>
          <img src={product.image_path} height="500" width="500" />
          <p className= "price" >Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
