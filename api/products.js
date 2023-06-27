const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct
} = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();
    res.send(allProducts);

  } catch (error) {
    next(error);

  }
});

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);
    res.send(product);

  } catch (error) {
    next(error);

  }
});

// POST /api/products
router.post('/', async (req, res, next) => {
  const { name, category, description, price } = req.body;
  
  try {
    const newProduct = await addProduct({
      name: name,
      category: category,
      description: description,
      price: price
    });
    res.send(newProduct);

  } catch (error) {
    next(error);

  }
});

// PATCH /api/products/:productId
router.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { name, category, description, price } = req.body;
  const updateFields = { id: productId };

  if (name) {
    updateFields.name = name;
  }

  if (category) {
    updateFields.category = category;
  }

  if (description) {
    updateFields.description = description;
  }

  if (price) {
    updateFields.price = price;
  }

  try {
    const updatedProduct = await editProduct(updateFields);
    res.send(updatedProduct);

  } catch (error) {
    next(error);

  }
});

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    await removeProduct(productId);
    res.send(product);
    
  } catch (error) {
    next(error);

  }
});

module.exports = router;