import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../axios-services';

const AddProduct = ({ token }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_path, setImage_Path] = useState("");

  const navigate = useNavigate();

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
    <div className="addProducts">
      <h2 className="addNewTitle">Add New Product</h2>
      <form onSubmit={ handleSubmit }>
        <fieldset>
          <div>
            <label className="addNewName">Name:</label>
            <input className="EnterNewName"
              type="text"
              placeholder="Enter Name*"
              value={ name }
              onChange={(event) => { setName(event.target.value) }}
              required
            />
          </div>
          <div>
            <label className="enterNewPrice"> Price:</label>
            <input className="inputNewPrice"
              type="number"
              placeholder="Enter Price*"
              value={ price }
              onChange={(event) => { setPrice(event.target.value) }}
              required
            />
          </div>
          <div>
            <label className="addNewDescription">Description:</label>
            <input className="inputNewDescription"
              type="text"
              placeholder="Enter Description*"
              value={ description }
              onChange={(event) => { setDescription(event.target.value) }}
              required
            />
          </div>
          <div>
            <label className="editCategory">Category:</label>
            <input className="inputCategory"
              type="text"
              placeholder="Enter Category*"
              value={ category }
              onChange={(event) => { setCategory(event.target.value) }}
              required
            />
          </div>
          <div>
            <label className="filePath">File Path:</label>
            <input className="inputFilePath"
              type="text"
              placeholder="Enter File Path of image"
              value={ image_path }
              onChange={(event) => { setImage_Path(event.target.value) }}
            />
          </div>
          <button className="submitButton" type="submit">Add Product</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddProduct;