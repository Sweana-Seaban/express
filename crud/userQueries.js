const Sequelize = require('sequelize'); //mysql2 is internally imported by sequelize
const bcrypt = require('bcrypt');
const zlib = require('zlib');

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
        allowNull: false, //null value
        //getter function - doesn't affect data that is inserted to table but only what is displayed
        // get() {
        //     const rawValue = this.getDataValue('username'); //getDataValue is a Sequelize method
        //     return rawValue.toUpperCase();
        // },
        
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        //setter function - affects the way data is inserted to table
        // set(value){
        //     const salt = bcrypt.genSaltSync(12); 
        //     const hash = bcrypt.hashSync(value,salt);
        //     this.setDataValue('password',hash);
        // }
    },
    age:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21,
        //custom validator
        validate:{
            // isOldEnough(value){
            //     if(value < 21){
            //         throw new Error("too young")
            //     }
            // }

            //customize error message
            isNumeric:{
                msg: 'You must enter a number!!'
            }
        }
    },
    user_type:{
        type: Sequelize.DataTypes.STRING
    },
    description:{
        type:Sequelize.DataTypes.STRING,
        // set(value){
        //     const compressed = zlib.deflateSync(value).toString('base64');
        //     this.setDataValue('description',compressed);
        // },
        // get(){
        //     const value = this.getDataValue('description');
        //     const uncompressed = zlib.inflateSync(Buffer.from(value,'base64'));
        //     return uncompressed.toString();
        // }
    },
    //virtual field - not present in table
    aboutUser:{
        type:Sequelize.DataTypes.VIRTUAL,
        get(){
            return `${this.username} ${this.description}`;
        }
    },
    email:{
        type:Sequelize.DataTypes.STRING,
        unique:true, //unique constraint
        validate:{
            //isEmail:true
            isIn:[['abc@gmail.com','aed@gmail.com','we@gmail.com']]
        }
    }
});


User.sync({alter:true}).then(() => {
    
    //insert users
    // return User.create({
    //     username:'jasper',
    //     password:'12',
    //     user_type:'buyer',
    //     description:'This is a really long description and it can be really long'
    // })
    
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
    //return User.findOne({where:{username:'jasper'}}); //fetches one row
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
    //return User.findAndCountAll({where:{username:'ravz'},raw:true});

    // return User.create({
    //     username:'edward carlisle',
    //     password:'234',
    //     email:'abcd',
    //     user_type:'buyer',
    //     description:'a really long description'
    // })

    //using validate()
    // const user = User.build({email:'tom'});
    // return user.validate();

    return User.create({
        username:'fallon',
        password:'12',
        user_type:'seller',
        age:24,
       email:'we@gmail.com'
    })
}).then((data) => {
    // data.forEach(element => {
    //     console.log(element.toJSON());
    // });
    // console.log(data.username);
    // console.log(data.password);
    // console.log(data.description);
    console.log(data);
})