const express = require('express');
require('dotenv').config()
const route = express.Router()

const Mongoose = require('mongoose').Mongoose
const { Server } = require("socket.io");


const http = require("http");
const app = express()



const instance1 = new Mongoose()




const { faqSchema, actSchema, registerSchema } = require('../models/database');



try {
    instance1.connect(process.env.MONGO_URL);
} catch (error) {
    console.log('error has occured')
}


const faqmodel = instance1.model('faqmodel', faqSchema)
const actmodel = instance1.model('actmodel', actSchema)
const auth = instance1.model('auth', registerSchema)

const { v4: uuidv4 } = require('uuid');




const bcrypt = require('bcrypt');
const { log } = require('console');
authMiddleware = function (req, res, next) {
    if (req.session.activeStat) {
        next()
    } else {
        res.send({ status: false, reason: 'login first' })
    }
}




route.get('/status', (req, res) => {
    try{
    if (req.session.admin) {
        return res.send({ status: true, message: 'is logged in', user: 'admin' })
    }
    if (req.session.activeStat) {
        return res.send({ status: true, message: 'active user in the session', user: 'normal' })
    }
}
    catch(err) {
        console.log('touched');
        res.send({ status: false, message: 'user not logged in!' })
    }
})

// route.get('api/status',(req,res)=>
// {
//         if(req.session.admin)
//         {
//             res.send({status:true,message:'admin user in the session'})
//         }
//         else{
//             res.send({status:false,message:'user not logged in!'})
//         }
// })
route.post('/', authMiddleware, async (req, res) => {

    const { first, second } = req.body
    const row = new faqmodel({ que: first, ans: second, key: uuidv4() })

    const val = await row.save()

    res.send('success')


})

route.post('/activity', authMiddleware, async (req, res) => {
    const { value } = req.body
    const row = new actmodel({ act: value, key: uuidv4() })
    try {
        const val = await row.save()
        res.send({ status: true })
    } catch
    {
        console.log({ status: false, reason: 'unable to insert to db' });
    }


})
route.get('/activity', authMiddleware, async (req, res) => {
    console.log(req.session);

    const rows = await actmodel.find()
    console.log(rows)
    res.send({ status: true, rows })


})

route.get('/', authMiddleware, async (req, res) => {
    const rows = await faqmodel.find()
    console.log(rows);
    res.send({ status: true, rows })

})

route.get('/login', (req, res) => {
    res.send('session started')
})

route.get('/register', (req, res) => {
    console.log(req.session);
    res.send('hi')


})

route.post('/register', async (req, res) => {
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
                        res.send({ status: false, message: 'something error hrouteeneded' })
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

route.post('/login', async (req, res) => {
    const { name, password } = req.body

    const response = await auth.findOne({ name: name })
    if (response) {
        bcrypt.compare(password, response.password, function (err, result) {
            // result == true
            if (result) {
                if (name === 'qwerty') { req.session.admin = true }
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

route.post('/del/faq', authMiddleware, async (req, res) => {
    const { key } = req.body
    console.log(key);
    try {
        const response = await faqmodel.findOneAndDelete({ key: key })

        if (response) {
            res.send({ status: true, message: 'succesfuly deleted' })
        }


    }
    catch
    {
        res.send({ status: false, message: 'there is a problem in server' })
    }


})

route.post('/del/act', authMiddleware, async (req, res) => {
    const { key } = req.body
    console.log(key);
    try {
        const response = await actmodel.findOneAndDelete({ key: key })

        if (response) {
            console.log('hehe deleted activity');
            res.send({ status: true, message: 'succesfuly deleted' })
        }


    }
    catch
    {
        res.send({ status: false, message: 'there is a problem in server' })
    }


})

route.post('/logout', (req, res) => {
    if (req.session.admin) {
        req.session.admin = false
        req.session.activeStat = false
        return res.send({ status: true, message: 'logged out!' })
    }
    else {
        req.session.activeStat = false
        return res.send({ status: true, message: 'logged out!' })
    }

})
module.exports = route