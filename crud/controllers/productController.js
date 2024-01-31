// const products = require('../database')
const {getAllProducts,getProduct,insertProduct,deleteProduct,updateProduct} = require('../products')

const homePage = (req,res) => {
    res.send('Welcome to Products Page')
}

const getProducts = async(req,res) => {
    const products = await getAllProducts()
    res.send(products)
}

const getSingleProduct = async(req,res) => {
    const product_id = req.params.id
    const product = await getProduct(product_id)
    res.send(product)
}

const createProduct = async(req,res) => {
    const {name,desc,price} = req.body
    const product = await insertProduct(name,desc,price)
    res.send(product)
}

const modifyProduct = async(req,res) => {
    const product_id = req.params.id
    const {name,desc,price} = req.body
    const product = await updateProduct(product_id,name,desc,price)
    res.send(product)
}

const removeProduct = async(req,res) => {
    const product_id = req.params.id
    const product = await deleteProduct(product_id)
    res.send(product)
}

module.exports = {
    homePage,
    getProducts,
    getSingleProduct,
    createProduct,
    modifyProduct,
    removeProduct
}