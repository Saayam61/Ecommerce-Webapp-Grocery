const express = require ('express')
const app = express()
//to work in file
const path = require('path');
//to use put, patch, delete in froms. override http methods
const methodOverride = require('method-override');
//for form submission and other datas in req.body
const bodyParser = require('body-parser');
//input validator
const expressValidator = require('express-validator');
//for different domains(cross-origin resource sharing) for payemnt api
// const cors = require('cors');
//order traking, user history, user preference, recently viewed
//stored in server side
const session = require('express-session');
//session identifiers, user authentication tokens, and shopping cart contents
//stored in client side
const cookieParser = require('cookie-parser')
//environment variables
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./src/model/index')
db.sequelize.sync({force: false})

app.set('view engine', 'ejs')
app.set('views', './src/view')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const indexRouter = require('./src/route/indexroute')
const userRouter = require('./src/route/userroute')

app.use(indexRouter)
app.use(userRouter)

app.use(session({
    secret : 'GroceryEcommerceWebsite@@##123321##@@GEW',
    resave: true,
    saveUninitialized: true,
}))


app.set('PORT', port);
app.listen(app.get('PORT'), () => {
    console.log(`Server is running at port ${app.get('PORT')}`);
});
