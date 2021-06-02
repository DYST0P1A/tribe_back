

const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlProducts = require('../controllers/products');
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

router
    .route('/products/getByGender')
    .get(ctrlProducts.productsByGender)

router
    .route('/products/getByCategory')
    .get(ctrlProducts.productsByCategory)


module.exports = router;