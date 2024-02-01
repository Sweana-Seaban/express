const {selectOrders,selectOrderById,insertOrder,deleteOrder,updateOrder} = require('../order')

const { body } = require('express-validator')
const homePage = (req,res) =>{
    res.send('Welcome to Orders Page')
}

//select all
const displayAll = async(req,res) => {
    const products = await selectOrders()
    res.send(products)
}

//select by id
const displayById = async(req,res) => {
    const id = req.params.id
    const product = await selectOrderById(id)
    res.send(product)
}

//insert product
const createOrder = async(req,res) => {
    const title = body('title');
    if(!title.isEmpty()){
        const {title,desc,amount} = req.body
        const newOrder = await insertOrder(title,desc,amount)
        res.status(200).send(newOrder)
    }
    else{
        throw new Error("Order-title is empty")
    }
    
}

//delete product
const removeOrder = (req,res) => {
    const id = req.params.id
    deleteOrder(id)
    res.status(200).send('Order Deleted successfully')
}

//update product
const modifyOrder = (req,res) => {
    const id = req.params.id
    const {title,desc,amount} =req.body
    updateOrder(id,title,desc,amount)
    res.status(200).send('Order updated successfully')
}
module.exports = {homePage,displayAll,displayById,createOrder,removeOrder,modifyOrder}