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
        defaultValue:'Computer Science'
    },
    school_year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subscribed_to_wittcode:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

Student.sync({alter:true}).then(() => {
    console.log('Users table created successfully');
    Student.bulkCreate([
        {
            name:'isabella',
            school_year:2000
        },
        {
            name:'edward',
            school_year:2001
        },
        {
            name:'charlie',
            favourite_class:'design',
            school_year:2002
        },
        {
            name:'jacob',
            school_year:2000
        },
        {
            name:'carlisle',
            favourite_class:'medicine',
            school_year:2001,
            subscribed_to_wittcode:false
        },
        {
            name:'rene',
            school_year:2000
        },
        {
            name:'esme',
            favourite_class:'design',
            school_year:2002,
            subscribed_to_wittcode:false
        },
        {
            name:'charlotte',
            school_year:2000
        }
    ],{validate:true});
}).catch(() => {
    console.log('Error in table creation');
})