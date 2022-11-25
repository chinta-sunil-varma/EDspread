
const mongoose = require('mongoose');

const Mongoose = require('mongoose').Mongoose;

const instance1=new Mongoose()

main().catch(err => console.log(err));

async function main() {
  await instance1.connect('mongodb://localhost:27017/edspread');
  console.log('connected to db')
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
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

const faqmodel=instance1.model('faqmodel',faqSchema)

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

const actmodel=instance1.model('actmodel',actSchema)

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

const auth=instance1.model('auth',registerSchema)



module.exports={faqmodel,actmodel,  auth}