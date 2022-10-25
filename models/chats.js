const mongoose =require('mongoose')

const Mongoose =require('mongoose').Mongoose
const instance2 = new Mongoose()

const schema =mongoose.Schema
const url = 'mongodb+srv://sathwik13:edspread@cluster0.j2qeppm.mongodb.net/?retryWrites=true&w=majority'
const connect = instance2.connect(url)

const chatSchema = new schema({
    message:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    time:{
        type:String ,
        required:true
    },
    room:{
        type:Number,
        required:true
    }
})


var ChatM = instance2.model('ChatM' , chatSchema)

module.exports =ChatM