const express = require('express');
const bodyParser = require('body-parser');
const {faqmodel,actmodel} = require('./models/database');
const cors = require('cors');
const app=express()

app.use(bodyParser.json())

app.use(cors())

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // // Set to true if you need the website to include cookies in the requests sent
//     // // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.post('/',async (req,res)=>
{
    const {first,second}=req.body
    const row=new faqmodel({que:first,ans:second})
   const val = await row.save()

   res.send('success')
    
})

app.post('/activity',async (req,res)=>
{
    const {value}=req.body
    const row=new actmodel({act:value})
    try
   {
    const val = await row.save()
    res.send('success')
}catch
   {
    console.log('unable to post the data');
   }
    
})
app.get('/activity',async(req,res)=>
{
    const rows=await actmodel.find()
    console.log(rows)
    res.send(rows)
})

app.get('/',async(req,res)=>
{
    const rows=await faqmodel.find()
    console.log(rows);
    res.send(rows)
})

const PORT=5000||process.env.PORT
app.listen(PORT,()=>
{
    console.log('succesfuly listening in ',PORT);
})