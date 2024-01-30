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
        username:'rene',
        password:'123',
        user_type:'buyer'
    });
    
}).then(async(data) => {
    console.log('data after creation',data.toJSON());

    //update multiple fields of instance
    // data.set({
    //     username:'carlisle',
    //     password:'1234',
    //     user_type:'seller'
    // });
    // data.save();
    // console.log('User updated');
    // console.log('data after updation',data.toJSON());

    //updating particular field of an instance
    // data.age = 24; 
    // data.save();

    //destroying an instance
    // data.destroy();
    // console.log('user destroyed');
    
    // data.username = 'edward';
    // console.log('after updation username is:',data.username);
    // return data;

    //saving only particular fields
    // data.username='rose';
    // data.user_type='seller';
    // await data.decrement({'age':2})
    // data.save({fields:['username','age']});

    // await data.reload();
    // console.log('data after updation',data.toJSON());

    //incrementing integer values
    data.username='rose';
    data.user_type='seller';
    await data.increment({age:5});
    data.save();
    
})
// .then(async(data) => {

//     reloading an instance
//     await data.reload();
//     console.log('after reloading instance username is:',data.username);
    
// })
.catch((err) => {
    console.log(err);
});

