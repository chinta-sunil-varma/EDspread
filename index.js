const express = require('express');
const path=require('path')
require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session')
const Mongoose = require('mongoose').Mongoose
const { Server } = require("socket.io");
const ChatM = require('./models/chats')
const chatRouter = require('./routes/chatRouter')
const route = require('./routes/mainRoutes')
const MongoStore = require('connect-mongo');

const http = require("http");
const app = express()
const server = http.createServer(app);


authMiddleware = function (req, res, next) {
    if (req.session.activeStat) {
        next()
    } else {
        res.send({ status: false, reason: 'login first' })
    }
}
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'frontend')))


app.use(
    session({
        name: 'hehe',
        secret: "hehesemcret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create(
            {
                mongoUrl: process.env.MONGO_URL,
                ttl: 24 * 60 * 60,
                autoRemove: 'native'

            }
        ),

    }
    )
);
app.use('/api', route)

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


//     // // Set to true if you need the website to include cookies in the requests sent
//     // // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
const instance1 = new Mongoose()




// const { faqSchema,actSchema, registerSchema } = require('./models/database');


// console.log(process.env.MONGO_URL)
try {
    instance1.connect(process.env.MONGO_URL);
} catch (error) {
    console.log('error has occured')
}

// conn1
// .then((db)=>{
//     console.log("Connected properly DBMAIN")
//   } , (err)=>{
//     console.log("Error :" +err)
//   })

//console.log('connected to db')

// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
//   const faqmodel=instance1.model('faqmodel',faqSchema)
//   const actmodel=instance1.model('actmodel',actSchema)
//   const auth=instance1.model('auth',registerSchema)

// const { v4: uuidv4 } = require('uuid');




// const bcrypt = require('bcrypt');








// connect
// .then((db)=>{
//   console.log("Connected properly DBchat")
// } , (err)=>{
//   console.log("Error :" +err)
// })

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
    },
});
app.get('/login',(req,res)=>
{
      res.sendFile(path.join(__dirname,'frontend','index.html'))
})
app.use('/fetch', chatRouter)
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        ChatM.create({ message: data.message, author: data.author, time: data.time, room: data.room })
            //chatM.insertOne({message:data.message , author:data.author , time:data.time , room:data.room})
            .then((msg) => {
                console.log('msg created succesfully', msg)
            }, (err) => next(err))
            .catch((err) => console.log(err))
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});





const PORT = 5000 || process.env.PORT
server.listen(PORT, () => {
    console.log('succesfuly listening in ', PORT);
})