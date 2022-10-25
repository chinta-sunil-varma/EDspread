const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session')
const Mongoose = require('mongoose').Mongoose
const { Server } = require("socket.io");
const ChatM = require('./models/chats')
const chatRouter = require('./routes/chatRouter')

const http = require("http");
const app = express()
const server = http.createServer(app);


authMiddleware=function (req,res,next)
{
    if(req.session.activeStat)
    {
        next()
    }else
    {
        res.send({status:false,reason:'login first'})
    }
}
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
    session({
        name: 'hehe',
        secret: "hehesemcret",
        resave: true,
        saveUninitialized: true,
        Domain: 'localhost:3000'
    })
);


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const instance1 = new Mongoose()




const { faqSchema,actSchema, registerSchema } = require('./models/database');



instance1.connect('mongodb://localhost:27017/edspread');
// conn1
// .then((db)=>{
//     console.log("Connected properly DBMAIN")
//   } , (err)=>{
//     console.log("Error :" +err)
//   })

  //console.log('connected to db')
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  const faqmodel=instance1.model('faqmodel',faqSchema)
  const actmodel=instance1.model('actmodel',actSchema)
  const auth=instance1.model('auth',registerSchema)

const { v4: uuidv4 } = require('uuid');




const bcrypt = require('bcrypt');








// connect
// .then((db)=>{
//   console.log("Connected properly DBchat")
// } , (err)=>{
//   console.log("Error :" +err)
// })

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  app.use('/fetch' , chatRouter)
  io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
  
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
  
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
          ChatM.create({message:data.message , author:data.author , time:data.time , room:data.room})
          //chatM.insertOne({message:data.message , author:data.author , time:data.time , room:data.room})
          .then((msg)=>{
            console.log('msg created succesfully' , msg)
            }, (err)=>next(err))
          .catch((err)=> console.log(err))
            });
  
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
  });



app.get('/status',(req,res)=>
{
        if(req.session.admin)
        {
            return res.send({status:true,message:'is logged in',user:'admin'})
        }
        if(req.session.activeStat)
        {
           return res.send({status:true,message:'active user in the session',user:'normal'})
        }
        else{
            res.send({status:false,message:'user not logged in!'})
        }
})

// app.get('/status/admin',(req,res)=>
// {
//         if(req.session.admin)
//         {
//             res.send({status:true,message:'admin user in the session'})
//         }
//         else{
//             res.send({status:false,message:'user not logged in!'})
//         }
// })
app.post('/', authMiddleware ,async (req, res) => {
   
    const { first, second } = req.body
    const row = new faqmodel({ que: first, ans: second,key:uuidv4() })

    const val = await row.save()

    res.send('success')
   

})

app.post('/activity',authMiddleware , async (req, res) => {
  const { value } = req.body
    const row = new actmodel({ act: value,key:uuidv4() })
    try {
        const val = await row.save()
        res.send({status:true})
    } catch
    {
        console.log({status:false,reason:'unable to insert to db'});
    }
    

})
app.get('/activity',authMiddleware , async (req, res) => {
    console.log(req.session);

        const rows = await actmodel.find()
        console.log(rows)
        res.send({status:true,rows})
    
   
})

app.get('/',authMiddleware , async (req, res) => {
   const rows = await faqmodel.find()
    console.log(rows);
    res.send({status:true,rows})
   
})

app.get('/login', (req, res) => {
    res.send('session started')
})

app.get('/register', (req, res) => {
    console.log(req.session);
    res.send('hi')


})

app.post('/register', async (req, res) => {
    const { name, password } = req.body
    console.log(name, password);
    try {
        const response = await auth.findOne({ name: name, password: password })
        if (response) {
            res.send({ status: false, message: 'already account exist!' })
        }
        else {
            try {
                const saltRounds = 12;
                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    try {
                        const response = await auth.insertMany({ name: name, password: hash })
                        if (response) {
                            res.send({ status: true, message: 'inserted succesful' })
                        }
                        else {
                            res.send({ status: false, message: 'unable to proceed try again!' })
                        }
                    }
                    catch (err) {
                        res.send({ status: false, message: 'something error happeneded' })
                    }

                });

            } catch (error) {
                console.log(error);
            }


        }
    } catch (error) {
        console.log(error)
    }


})

app.post('/login', async (req, res) => {
    const { name, password } = req.body

    const response = await auth.findOne({ name: name })
    if (response) {
        bcrypt.compare(password, response.password, function (err, result) {
            // result == true
            if (result) {
                if(name==='qwerty')
                {req.session.admin=true}
                req.session.activeStat = true
                res.send({ status: true, message: 'logged in succesfuly' })
            }
            else {
                res.send({
                    status: false, message: 'username or passwrod incorrect'
                })

            }
        });

    }
    else {
        res.send({ status: false, message: 'credentials mis match' })
        console.log('unable to fetch');
    }


})

app.post('/del/faq',authMiddleware,async(req,res)=>{
       const {key}=req.body
       console.log(key);
       try
      {
         const response= await faqmodel.findOneAndDelete({key:key})

         if(response)
         {
            res.send({status:true,message:'succesfuly deleted'})
         }
    
    
    }
    catch
    {
        res.send({status:false,message:'there is a problem in server'})
    }
       

})

app.post('/del/act',authMiddleware,async(req,res)=>{
    const {key}=req.body
    console.log(key);
    try
   {
      const response= await actmodel.findOneAndDelete({key:key})

      if(response)
      {
        console.log('hehe deleted activity');
         res.send({status:true,message:'succesfuly deleted'})
      }
 
 
 }
 catch
 {
     res.send({status:false,message:'there is a problem in server'})
 }
    

})

app.post('/logout',(req,res)=>
{ if(req.session.admin)
    {
        req.session.admin=false
        req.session.activeStat=false
        return res.send({status:true,message:'logged out!'})
    }
    else
    {
        req.session.activeStat=false
       return res.send({status:true,message:'logged out!'})
    }
    
})

const PORT = 5000 || process.env.PORT
server.listen(PORT, () => {
    console.log('succesfuly listening in ', PORT);
})