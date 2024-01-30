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
    //return User.findAll({attributes:['username','password']})

    //select using aliases
    //return User.findAll({attributes: [['username','myName'],['password','passwords']]});

    //aggregate
    //return User.findAll({attributes : [[sequelize.fn('SUM',sequelize.col('age')),'total_age']]});

    //excluding fields
    //return User.findAll({attributes: {exclude:['password']}});

    //where clause
    //return  User.findAll({attributes: ['username'],where:{age:23}});

    //multiple where clause
    //return User.findAll({where : {age:23,username:'rose'} })

    //limit result particular number of rows
    //return User.findAll({limit:2})

    //ordering
    //return User.findAll({order :[['age','desc']]});

    //grouping
    return User.findAll({
        attributes:['username',
    [sequelize.fn('sum',sequelize.col('age')),'sum_age']],
    group:'username'
    });
}).then((data) => {
    data.forEach(element => {
        console.log(element.toJSON());
    });
})