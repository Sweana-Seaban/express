const Sequelize = require('sequelize');
const {DataTypes,Op} = require('sequelize');

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
    // Student.bulkCreate([
    //     {
    //         name:'ethan hunt',
    //         favourite_class:'electrical',
    //         subscribed_to_wittcode:true,
    //         school_year:2000
    //     },
    //     {
    //         name:'harlot',
    //         school_year:2001
    //     },
    // ],{validate:true});
    // return Student.findAll( {attributes: ['name'],
    //     where: {
    //     [Op.or]:{
    //         favourite_class:'Computer Science',
    //         subscribed_to_wittcode:true
    //     }}});
    return Student.findAll({
        attributes:['school_year',[sequelize.fn('COUNT',sequelize.col('school_year')),'num_students']],
        group:'school_year'
    })
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
    })
})
.catch(() => {
    console.log('Error in table creation');
})