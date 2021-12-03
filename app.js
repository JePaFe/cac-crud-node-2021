require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const methodOverride = require('method-override')

const session = require('express-session')

app.use(cors())

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const isLogin = (req, res, next) => {
    if (!req.session.user_id 
        && req.url != '/login' 
        && req.url != '/register' 
        && req.url != '/contacto') {
        res.redirect('/login')
    }

    next()
}

// app.use(isLogin)

app.get('/', isLogin, (req, res) => {
    console.log(req.session)
    res.render('index')
})

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/productos'))
app.use('/', require('./routes/contacto'))

app.use('/api', require('./routes/api/categorias'))

app.use((req, res, next) => {
    res.status(404).send('Not found')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`http://localhost:${port}`))