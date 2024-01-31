const {selectOrders,selectOrderById,insertOrder,deleteOrder,updateOrder} = require('../order')

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
    const {title,desc,amount} = req.body
    const newOrder = await insertOrder(title,desc,amount)
    res.status(200).send(newOrder)
}

//delete product
const removeOrder = async(req,res) => {
    const id = req.params.id
    deleteOrder(id)
    res.status(200).send('Order Deleted successfully')
}

//update product
const modifyOrder = async(req,res) => {
    const id = req.params.id
    const {title,desc,amount} =req.body
    updateOrder(id,title,desc,amount)
    res.status(200).send('Order updated successfully')
}
module.exports = {homePage,displayAll,displayById,createOrder,removeOrder,modifyOrder}