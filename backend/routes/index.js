const express = require('express');
const router = express.Router();
// const productController = require('../controller/product/productController');
const productController = require('../controller/product/productController');
const categoryController = require('../controller/category/categoryController');

//get all products
router.get('/', productController.getAllProducts);
router.post('/create-products', productController.createProduct);

router.post('/update-products/:id', productController.updateProduct);

router.get('/delete-products/:id', productController.deleteProduct);

//get all categories 

router.get('/categories', categoryController.getAllCategories);
router.post('/create-categories',categoryController.createCategory);

router.post('/update-categories/:id',categoryController.updateCategory);

router.get('/delete-categories/:id',categoryController.deleteCategory);

module.exports = router;