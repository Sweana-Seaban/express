const express = require('express')
const app = express();

const {getAllProducts,getProduct,insertProduct,deleteProduct,updateProduct} = require('./database')


app.use(express.json())

app.get('/',(req,res) => {
    res.send('Welcome to products page')
})


//select all products
app.get('/products',async(req,res) => {
    const products = await getAllProducts()
    res.send(products)
})


//select products by id
app.get('/products/:id',async(req,res) => {
    const product_id = req.params.id
    const product = await getProduct(product_id)
    res.send(product)

})

//insert product
app.post('/products',async(req,res) => {
    const {name,desc,price} = req.body
    const product = await insertProduct(name,desc,price)
    res.send(product)
})

//delete products
app.delete('/products/:id',async(req,res) => {
    const product_id = req.params.id
    const product = await deleteProduct(product_id)
    res.send(product)
})

//update products
app.post('/products/:id',async(req,res) => {
    const product_id = req.params.id
    const {name,desc,price} = req.body
    const product = await updateProduct(product_id,name,desc,price)
    res.send(product)
})


app.listen(3000,() => {
    console.log('Server is listening to port 3000.....')
})


