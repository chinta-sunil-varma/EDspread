const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session')
const { faqmodel, actmodel, auth } = require('./models/database');



const bcrypt = require('bcrypt');


const app = express()
authMiddleware=function (req,res,next)
{
    if(req.session.activeStat)
    {
        next()
    }else
    {

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

app.post('/', async (req, res) => {
    if(req.session.activeStat)
    {const { first, second } = req.body
    const row = new faqmodel({ que: first, ans: second })

    const val = await row.save()

    res.send('success')}
    else
    {
        res.send({status:false,reason:'login first'})
    }

})

app.post('/activity', async (req, res) => {
    if(req.session.activeStat)
    {const { value } = req.body
    const row = new actmodel({ act: value })
    try {
        const val = await row.save()
        res.send({status:true})
    } catch
    {
        console.log({status:false,reason:'unable to insert to db'});
    }}
    else
    {
        res.send({status:false,reason:'login first to avail the feature'})
    }

})
app.get('/activity', async (req, res) => {
    console.log(req.session);
    if (req.session.activeStat) {
        const rows = await actmodel.find()
        console.log(rows)
        res.send({status:true,rows})
    }
    else
    {
        res.send([{reason:'LOGIN FIRST TO SEE THE CONTENT',status:false}])
    }
})

app.get('/', async (req, res) => {
    if(req.session.activeStat)
    {const rows = await faqmodel.find()
    console.log(rows);
    res.send({status:true,rows})}
    else
    {
        res.send({status:false,reason:'login first to avail the feature'})
    }
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

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    console.log('succesfuly listening in ', PORT);
})