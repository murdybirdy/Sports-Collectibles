const express = require('express');
const router = express.Router();
const {
  getAllProducts
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

});

module.exports = router;