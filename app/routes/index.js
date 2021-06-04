const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlProducts = require('../controllers/products');
const ctrlBrands = require('../controllers/brands');
const auth = require('../middleware/auth');

router
    .route('/users')
    .post(ctrlUsers.usersCreate);

router
    .route('/users/login')
    .post(ctrlUsers.usersLogin)

router
    .route('/users/me')
    .get(auth, ctrlUsers.userMe)

router
    .route('/users/me/changepass')
    .post(auth, ctrlUsers.changePassword)

router
    .route('/confirm/:code')
    .get(ctrlUsers.confirmAccount)




router
    .route('/products')
    .post(ctrlProducts.productsCreate)
    .get(ctrlProducts.productById)

router
    .route('/products/getByBrand')
    .get(ctrlProducts.productsByBrand)

router
    .route('/products/getByGender')
    .get(ctrlProducts.productsByGender)

router
    .route('/products/getByCategory')
    .get(ctrlProducts.productsByCategory)

router
    .route('/products/search')
    .get(ctrlProducts.productByName)

router
    .route('/products/getBySize')
    .get(ctrlProducts.productsBySize)

router
    .route('/products/getByColor')
    .get(ctrlProducts.productsByColor)

router
    .route('/products/getByPrice')
    .get(ctrlProducts.productsByPrice)



router
    .route('/brands')
    .post(ctrlBrands.brandsCreate)

router
    .route('/brands/search')
    .get(ctrlBrands.brandByName)


module.exports = router;