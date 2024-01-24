const express = require('express');
const app = express()//creates an express app
const {products} = require('./data')
// app.get('/',(req,res)=>{
//     console.log('get method')
//     res.status(200).send('home page')//send() sends http response
// })

// app.get('/about',(req,res)=>{
//     console.log('get method')
//     res.status(200).send('about page')
// })

// app.all('*',(req,res)=>{
//     res.status(404).send('<h1>resource not found</h1>')
// })

// app.get('/',(req,res)=>{
//     res.json([{'name':'nicholas'},{'name':'garrett'}])
// })

app.get('/', (req,res) => {
    //res.json(products)
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products',(req,res) => {
    const newProducts=products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
})


// app.get('/api/products/1',(req,res) => {
//     const singleProduct = products.find((product)=>product.id === 1)
//     res.json(singleProduct)
// })

app.get('/api/products/:productID',(req,res) => {
    // console.log(req);
    // console.log(req.params)
    const {productID} =req.params;

    const singleProduct = products.find((product)=>product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist')
    }

    return res.json(singleProduct)
})


app.get('/api/products/:productID/reviews/:reviewID', (req,res) => {
    console.log(req.params);
    res.send('Hello World')
})



app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})


//app.get
//app.put
//app.post
//app.all
//app.use
//app.listen
//app.delete
