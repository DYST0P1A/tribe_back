const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlProducts = require('../controllers/products');
const ctrlBrands = require('../controllers/brands');
const ctrlCarts = require('../controllers/carts')
const ctrlFavorites = require('../controllers/favorites')
const ctrlWishLists = require('../controllers/wishlists')
const ctrlOrders = require('../controllers/orders')

const auth = require('../middleware/auth');

// Users
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
    .route('/users/me/logout')
    .post(auth, ctrlUsers.usersLogout)

router
    .route('/confirm/:code')
    .get(ctrlUsers.confirmAccount)


// Carts
router
    .route('/users/me/cart')
    .post(auth, ctrlCarts.updateCart)
    .get(auth, ctrlCarts.getCart)


// Favorites
router
    .route('/users/me/favorites')
    .post(auth, ctrlFavorites.updateFavorites)
    .get(auth, ctrlFavorites.getFavorites)


// WishLists
router
    .route('/users/me/wishlist')
    .post(auth, ctrlWishLists.updateWishList)
    .get(auth, ctrlWishLists.getWishlist)


// Prodcuts
router
    .route('/products')
    .post(auth, ctrlProducts.productsCreate)
    .get(ctrlProducts.getProducts)

router
    .route('/products/getById')
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


// Brands
router
    .route('/brands')
    .post(auth, ctrlBrands.brandsCreate)
    .get(ctrlBrands.getBrands)

router
    .route('/brands/search')
    .get(ctrlBrands.brandByName)


// Orders
router
    .route('/users/me/orders')
    .post(auth, ctrlOrders.ordersCreate)
    .get(auth, ctrlOrders.getOrders)

module.exports = router;