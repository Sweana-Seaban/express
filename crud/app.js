const express = require('express')
const app = express();
// const routes = require('./routes/productRoutes') //importing product routes
const routes = require('./routes/orderRoutes'); //importing order routes

app.use(express.json())

app.use('/',routes);

app.listen(3000,() => {
    console.log('Server is listening to port 3000.....')
})

