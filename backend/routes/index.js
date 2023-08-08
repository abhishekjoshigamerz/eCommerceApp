const express = require('express');
const router = express.Router();
// const productController = require('../controller/product/productController');
const productController = require('../controller/product/productController');
const categoryController = require('../controller/category/categoryController');
const userController = require('../controller/user/userController');

//get all products
router.get('/product/', productController.getAllProducts);
router.post('/create-product', productController.createProduct);

router.post('/update-product/:id', productController.updateProduct);

router.get('/delete-product/:id', productController.deleteProduct);

//get on the basis of pricing 

router.post('/product/filterbypricerange', productController.getProductByPriceRange);
router.post('/product/filterByCategories',productController.filterProductsByCategories);

//get all categories 

router.get('/categories', categoryController.getAllCategories);
router.post('/create-categories',categoryController.createCategory);

router.post('/update-categories/:id',categoryController.updateCategory);

router.get('/delete-categories/:id',categoryController.deleteCategory);

//register users 

router.post('/registeruser',userController.registerUser);

router.post('/login',userController.loginUser);

module.exports = router;