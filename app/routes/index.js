const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlProducts = require('../controllers/products');
const ctrlProductsUsed = require('../controllers/productsUsed');
const ctrlBrands = require('../controllers/brands');
const ctrlCategories = require('../controllers/categories');
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


// Products
router
    .route('/products')
    .post(auth, ctrlProducts.productsCreate)
    .get(ctrlProducts.getProducts)

router
    .route('/products/getById')
    .post(ctrlProducts.productById)

router
    .route('/products/getByBrand')
    .post(ctrlProducts.productsByBrand)

router
    .route('/products/getByGender')
    .post(ctrlProducts.productsByGender)

router
    .route('/products/getByCategory')
    .post(ctrlProducts.productsByCategory)

router
    .route('/products/search')
    .post(ctrlProducts.productByName)

router
    .route('/products/getBySize')
    .post(ctrlProducts.productsBySize)

router
    .route('/products/getByColor')
    .post(ctrlProducts.productsByColor)

router
    .route('/products/getByPrice')
    .post(ctrlProducts.productsByPrice)


// ProductsUsed
router
    .route('/productsUsed')
    .post(auth, ctrlProductsUsed.productsUsedCreate)
    .get(ctrlProductsUsed.getProductsUsed)

router
    .route('/productsUsed/getById')
    .post(ctrlProductsUsed.productUsedById)

router
    .route('/productsUsed/getByBrand')
    .post(ctrlProductsUsed.productsUsedByBrand)

router
    .route('/productsUsed/getByGender')
    .post(ctrlProductsUsed.productsUsedByGender)

router
    .route('/productsUsed/getByCategory')
    .post(ctrlProductsUsed.productsUsedByCategory)

router
    .route('/productsUsed/search')
    .post(ctrlProductsUsed.productUsedByName)

router
    .route('/productsUsed/getBySize')
    .post(ctrlProductsUsed.productsUsedBySize)

router
    .route('/productsUsed/getByColor')
    .post(ctrlProductsUsed.productsUsedByColor)

router
    .route('/productsUsed/getByPrice')
    .post(ctrlProductsUsed.productsUsedByPrice)


// Brands
router
    .route('/brands')
    .post(auth, ctrlBrands.brandsCreate)
    .get(ctrlBrands.getBrands)

router
    .route('/brands/search')
    .get(ctrlBrands.brandByName)

router
    .route('/brands/searchById')
    .post(ctrlBrands.brandById)

//Categories   
router
    .route('/users/me/categories')
    .post(auth, ctrlCategories.categoriesCreate)

router
    .route('/categories')
    .get(ctrlCategories.getCategories)


// Orders
router
    .route('/users/me/orders')
    .post(auth, ctrlOrders.ordersCreate)
    .get(ctrlOrders.getOrders)

router
    .route('/users/me/orders/valorate')
    .post(auth, ctrlOrders.valorateProductOrder)

router
    .route('/users/me/orders/productsUsed')
    .post(auth, ctrlOrders.productUsedOrder)

module.exports = router;