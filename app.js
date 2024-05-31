require('dotenv').config()

const express = require('express')
const ejsmate = require('ejs-mate')
const path = require('path')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const passport = require('passport')
const localStrategy = require('passport-local')
const passportLocalMongoose 
    = require("passport-local-mongoose");
const flash = require('connect-flash')
const { spawn } = require('child_process');
const fs = require('fs');
const nodeMailer = require('nodemailer')

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const User = require('./models/user')

const MongoDBStore = require('connect-mongo')(session)

const app = express();



app.engine('ejs', ejsmate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/music-page'
// const dbUrl = 'mongodb://localhost:27017/music-page'
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24*3600
})

store.on('error', function(e){
    console.log('session store error', e)
})

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use((req,res, next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


const blogRouter = require('./routes/blog')
const feedbackRouter = require('./routes/feedback')
const profileRouter = require('./routes/profile')
const samplesRouter = require('./routes/samples')
const roleRouter = require('./routes/role')
const userRouter = require('./routes/user')
const lessonRouter = require('./routes/lesson')
const { isLoggedIn } = require('./middleware')

// const databaseUrl = process.env.DB_URL
// 'mongodb://localhost:27017/music-page'


app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.use('/blog', blogRouter)
app.use('/feedback', feedbackRouter)
app.use('/profile', profileRouter)
app.use('/', roleRouter)
app.use('/samples', samplesRouter)
app.use('/', userRouter)
app.use('/', lessonRouter)






app.post('/create-checkout-session', async(req,res)=>{
    try{
        const date = req.body.date
        const id = req.user.id
        const preferences = req.body.preferences
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            metadata: {user_id: id, date: date, pref: preferences},
            line_items: [{
                price_data:{
                    currency: 'eur',
                    product_data: {
                        name: `Private lesson ( ${date} )`
                    },
                    unit_amount: 1000
                },
                quantity: 1
            }
            ],
            mode: 'payment',
            success_url: `${process.env.SERVER_URL}/lesson`,
            cancel_url:`${process.env.SERVER_URL}/lesson`,    
        })
        res.json({url: session.url})
    }catch(e){
        res.status(500).json({error: e.message})
    }   
})



app.get('/forgotPassword', (req,res)=>{
    res.render('forgotPassword')
})

const sendEmail = async (transporter, mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email has been sent')
    } catch (error) {
        console.error(error)
    }
}


app.post('/forgotPassword', async (req,res)=>{
    var val = Math.floor(1000 + Math.random() * 9000);
        const transporter =  nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth:{
                user: 'laura.capaite123@gmail.com',
                pass: 'xvwn gkko rqzh gcog'
            }
        })
        
        const mailOptions = {
            from: {
                name: 'Test',
                adress: 'laura.capaite123@gmail.com'
            },
            to: req.body.email,
            subject: 'Recovery email',
            text: `Hey. Here is your recovery email. Your recovery code is ${val}`,
            html: ''
        }
        await User.findOneAndUpdate({email: req.body.email}, {recoveryCode: val})
        await sendEmail(transporter, mailOptions)
        res.render('recoverPassword', {email: req.body.email})  
})

app.post('/recoverPassword', (req,res)=>{
    User.findOne({ email: req.body.email, recoveryCode: req.body.code}, function (err, user) {
        if (!err) {
            user.changePassword(req.body.oldpassword, req.body.password, function (err) {
                if (!err) {
                    res.redirect('/login')
                } else {
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
    // res.render('recoverPassword', {email: req.body.email})  
    
})
    

app.get('/earTraining', isLoggedIn, (req,res)=>{
    res.render('game')
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('pageNotFound')
})






