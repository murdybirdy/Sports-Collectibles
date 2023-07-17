import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ token }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_path, setImage_Path] = useState("");

  const navigate = useNavigate();

  const createProduct = async (product, token) => {
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

    } catch (err) {
      console.error(err);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const product = {
      name: name,
      price: price,
      description: description,
      category: category,
      image_path: image_path
    };

    const results = await createProduct(product, token);
    if (!results.error) {
      alert("Product successfully added!");
      navigate("/");
    }

  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={ handleSubmit }>
        <fieldset>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Name*"
              value={ name }
              onChange={(event) => { setName(event.target.value) }}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              placeholder="Enter Price*"
              value={ price }
              onChange={(event) => { setPrice(event.target.value) }}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter Description*"
              value={ description }
              onChange={(event) => { setDescription(event.target.value) }}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              placeholder="Enter Category*"
              value={ category }
              onChange={(event) => { setCategory(event.target.value) }}
              required
            />
          </div>
          <div>
            <label>File Path:</label>
            <input
              type="text"
              placeholder="Enter File Path of image*"
              value={ image_path }
              onChange={(event) => { setImage_Path(event.target.value) }}
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddProduct;