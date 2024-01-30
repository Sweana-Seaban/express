const Sequelize = require('sequelize'); //mysql2 is internally imported by sequelize

//create an instance of sequelize using connection parameters
const sequelize = new Sequelize('express_crud','root','password',{
    dialect: 'mysql'
});

sequelize.authenticate().then(() =>{
    console.log('connection successful');
}).catch((err) => {
    console.log('error connecting to database');
});

const User = sequelize.define('user',{
    username:{
        type: Sequelize.DataTypes.STRING, //datatype
        allowNull: false //null value
    },
    password:{
        type: Sequelize.DataTypes.STRING
    },
    age:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21,
    },
    user_type:{
        type: Sequelize.DataTypes.STRING
    }
});


User.sync({alter:true}).then(() => {
    
    //select all users
    //return User.findAll();

    //select only specific fields
    return User.findAll({attributes:['username','password']})
}).then((data) => {

    data.forEach(element => {
        console.log(element.toJSON());
    });
})