const express = require('express')
const  mongoose  = require('mongoose')
const chatRouter  =express.Router()
const bodyParser = require('body-parser')


const ChatM = require('../models/chats')
chatRouter.route("/load/:roomID")
.get((req,res)=>{
    ChatM.find({room:req.params.roomID})
    .then((data)=>{res.json(data)
    console.log("data being sent to client" ,data)
    })
})


module.exports = chatRouter 