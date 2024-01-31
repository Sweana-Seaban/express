const Sequelize = require('sequelize')
const {DataTypes,Op} = require('sequelize')

const sequelize = new Sequelize('express_crud','root','password',{
    dialect:'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection to database is successfull');
}).catch(() => {
    console.log('Error establishing connection to database');
})

const Order = sequelize.define('order',{
    order_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    order_title:DataTypes.STRING,
    order_desc:DataTypes.STRING,
    order_amount:DataTypes.FLOAT
},{timestamps:false});

// Order.sync({alter:true}).then(() => {
//     console.log('Orders table created successfully');
// }).catch(() => {
//     console.log('Error in querying');
// })


//select all
const selectOrders = async() => {
    return await Order.findAll();
}

//select by id
const selectOrderById = async(id) => {
    return await Order.findByPk(id)
}

//insert
const insertOrder = async(title,desc,amount) => {
    const newOrder = Order.create({
        order_title:title,
        order_desc:desc,
        order_amount:amount
    })
    return(newOrder);
}

//delete 
const deleteOrder = async(id) => {
    Order.destroy({
        where:{order_id:id}
    })
}

//update
const updateOrder = async(id,title,desc,amount) => {
    const updateOrder = Order.update({
        order_title:title,
        order_desc:desc,
        order_amount:amount
    },{where:{order_id:id}})
    return updateOrder
}
module.exports = {selectOrders,selectOrderById,insertOrder,deleteOrder,updateOrder}