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
    // return User.findAll({
    //     attributes:['username',
    // [sequelize.fn('sum',sequelize.col('age')),'sum_age']],
    // group:'username'
    // });

    //offset
    //return User.findAll({offset:5,limit:5});

    //operators
    // return User.findAll({
    //     where:{
    //         [Sequelize.Op.or]:{
    //             username:'rose',
    //             age:25
    //         }
    //     }
    // });
    // return User.findAll({
    //     where:{
    //         age:{
    //             [Sequelize.Op.gt]:24
    //         }
    //     }
    // })

    //functions
    // return User.findAll({where:
    //     sequelize.where(sequelize.fn('char_length',sequelize.col('username')),6)
    // });

    //update table
    // return User.update({username:'robin'},{
    //     where:{username:'garret'}
    // });

    //delete using destroy
    //return User.destroy({where:{username:'nicholas'}});

    //delete using truncate
    //return User.destroy({truncate:true})

    //utility methods
    //return User.max('age'); //returning maximum age

    //finder methods
    //return User.findAll({raw:true});
    //return User.findByPk(32); //find by primary key
    //return User.findOne(); //fetches one row
    // return User.findOne({where:{age:
    //     {
    //         [Sequelize.Op.or]:{
    //             [Sequelize.Op.lt]:23,
    //             [Sequelize.Op.eq]:null
    //         }
    //     }
    // }});
    //return User.findOrCreate({where:{username:'wick'}}); //fetches or creates a row
    // return User.findOrCreate({where:{username:'ravz'},
    // defaults:{age:29}}); //if that particular instance is not found then its created with the specified default values if any
    return User.findAndCountAll({where:{username:'ravz'},raw:true});
}).then((data) => {
    // data.forEach(element => {
    //     console.log(element.toJSON());
    // });
    console.log(data);
})