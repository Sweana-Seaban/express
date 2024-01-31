const express = require('express')
const router = express.Router();

const {homePage,displayAll,displayById,createOrder,removeOrder,modifyOrder} = require('../controllers/orderController')

router.get('/',homePage);

//select all
router.get('/orders',displayAll);

//select by id
router.get('/order/:id',displayById)

//insert
router.post('/orders',createOrder)

//delete
router.delete('/order/:id',removeOrder)

//update
router.put('/order/:id',modifyOrder)

module.exports = router;