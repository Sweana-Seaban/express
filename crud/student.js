const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

const sequelize = new Sequelize('express_crud','root','password',{
    dialect:'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('Error occured in database connection');
});

const Student = sequelize.define('student',{
    student_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[4,20]
        }
    },
    favourite_class:{
        type:DataTypes.STRING,
        default:'Computer Science'
    },
    school_year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subscribed_to_wittcode:{
        type:DataTypes.TINYINT,
        default:true
    }
})

Student.sync({alter:true}).then(() => {
    console.log('Users table created successfully');
}).catch(() => {
    console.log('Error in table creation');
})