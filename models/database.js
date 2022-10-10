

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/edspread');
  console.log('connected to db')
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const faqSchema= new mongoose.Schema(
    {
        que:
        {
            required:true,
            type:String
        },
        ans:
        {
            required:true,
            type:String
        }
    }
)

const faqmodel=mongoose.model('faqmodel',faqSchema)

const actSchema=new mongoose.Schema(
    {
        act:
        {
            required:true,
            type:String
        }
    }
)

const actmodel=mongoose.model('actmodel',actSchema)

module.exports={faqmodel,actmodel}