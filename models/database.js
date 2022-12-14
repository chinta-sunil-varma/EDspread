

const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// var connect;
//  function main() {
//    connect =  mongoose.createConnection('mongodb://localhost:27017/edspread');
//   console.log('connected to db')
  
//   // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
// }
const faqSchema= new mongoose.Schema(
    {
        que:
        {   unique:true,
            required:true,
            type:String
        },
        ans:
        {
            required:true,
            type:String
        },
        key:
        {
            required:true,
            unique:true,
            type:String
        }
    }
)

// const faqmodel=conn.model('faqmodel',faqSchema)

const actSchema=new mongoose.Schema(
    {
        act:
        {
            unique:true,
            required:true,
            type:String,

        },
        key:
        {
            unique:true,
            required:true,
            type:String
        }
    }
)

// const actmodel=conn.model('actmodel',actSchema)

const registerSchema=new mongoose.Schema(
    {
       name:
       {
        unique:true,
        required:true,
        type:String
       },
       password:
       {
        required:true,
        type:String
       }
    }
)

// const auth=conn.model('auth',registerSchema)



module.exports={faqSchema,actSchema, registerSchema}