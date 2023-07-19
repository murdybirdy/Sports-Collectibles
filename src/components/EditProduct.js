import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../axios-services';

const EditProduct = ({ token, currentProduct }) => {
  const { id, name, price, description, category, image_path } = currentProduct;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedImage_Path, setUpdatedImage_Path] = useState(image_path);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const product = {
      name: updatedName,
      price: updatedPrice,
      description: updatedDescription,
      category: updatedCategory,
      image_path: updatedImage_Path
    };

    const results = await updateProduct(id, token, product);

    if (!results.error) {
      alert("Product successfully updated!");
      navigate("/");
    };
  };

  
  return (
    <div className="editProductsContainer">
      <form onSubmit={handleSubmit}>
        <h2 className="editProducts">Edit Product</h2>
        <fieldset>
          <div>
            <label className="name">Name:</label>
            <input className="Ename"
              type="text"
              placeholder="Enter Name*"
              value={updatedName}
              onChange={({target: {value}}) => {setUpdatedName(value)}}
              required
            />
          </div>
          <div>
            <label className="Editprice">Price:</label>
            <input className="Ename"
              type="number"
              placeholder="Enter Price*"
              value={ updatedPrice }
              onChange={({target: {value}}) => { setUpdatedPrice(value) }}
              required
            />
          </div>
          <div>
            <label className="Editdescription">Description:</label>
            <input className="Ename"
              type="text"
              placeholder="Enter Description*"
              value={ updatedDescription }
              onChange={({target: {value}}) => { setUpdatedDescription(value) }}
              required
            />
          </div>
          <div>
            <label className="editCategory">Category:</label>
            <input className="Ename"
              type="text"
              placeholder="Enter Category*"
              value={ updatedCategory }
              onChange={({target: {value}}) => { setUpdatedCategory(value) }}
              required
            />
          </div>
          <div>
            <label className="filepath">File Path:</label>
            <input className="Ename"
              type="text"
              placeholder="Enter File Path of image"
              value={ updatedImage_Path }
              onChange={({target: {value}}) => { setUpdatedImage_Path(value) }}
            />
          </div>
          <button className="submitButton" type="submit">Submit Changes</button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditProduct;