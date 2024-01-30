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



//using async() and await
// async function myFunction() {
//     await sequelize.authenticate()
//     console.log('successful connection');
// }

// myFunction()


//creating a model
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


//sync creates a table if it does not exist
User.sync({alter:true}).then(() =>{

    //creating instance using build and save method
    // const user = User.build({username:'nicholas',password:'1234',age:25,user_type:'buyer'})
    // return user.save(); //save is asynchronous
    

    //creating instance using create method
    return User.create({
        username:'esme',
        password:'123',
        user_type:'buyer'
    });
    
}).then((data) => {
    console.log(data.toJSON());

    //update multiple fields of instance
    data.set({
        username:'carlisle',
        password:'1234',
        user_type:'seller'
    });
    data.save();
    console.log('User updated');
    console.log(data.toJSON());

    //updating particular field of an instance
    // data.age = 24; 
    // data.save();

    
    
})
.catch((err) => {
    console.log(err);
});

