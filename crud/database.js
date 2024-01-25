const mysql = require('mysql2')

const dotenv =require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


connection.connect(function(err) {
    if(err){
        console.log(err)
    }
    else{
        console.log('Connected to database successfully')
    }
})


//select all products
const getAllProducts = async() => {
    const [Products] = await connection.query('select * from products')
    console.log(Products)
    return Products
}

//getAllProducts()



//select product by id
const getProduct = async(id) =>{
    const [product] = await connection.query(`select * from products where product_id=?`,[id])
    console.log(product[0])
    return product[0]
}

//getProduct(1)


//insert product
const insertProduct = async(name,desc,price) => {
    const [insertedProduct] = await connection.query(`insert into products(product_name,product_desc,product_price) values(?,?,?)`,[name,desc,price])
    const insertedId= insertedProduct.insertId
    console.log(insertedId)
    return getProduct(insertedId)
}

module.exports = {getAllProducts,getProduct,insertProduct}