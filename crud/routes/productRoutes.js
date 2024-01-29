const express = require('express'); //imports express

const router = express.Router(); //imports Router module

const {
    homePage,
    getProducts,
    getSingleProduct,
    createProduct,
    removeProduct,
    modifyProduct,
} = require('../controllers/productController'); //importing controller

router.get('/',homePage)
//products is the associated controller

router.get('/products',getProducts) //select all products
//getProducts is the associated controller

router.get('/products/:id',getSingleProduct) //select product by id
//getProduct is the associated controller

router.post('/products',createProduct) //insert product
//insertProduct is the associated controller

router.post('/products/:id',modifyProduct) //update product
//updateProduct is the associated controller

router.delete('/products/:id',removeProduct) //delete product
//deleteProduct is the associated controller

module.exports = router //exporting router
