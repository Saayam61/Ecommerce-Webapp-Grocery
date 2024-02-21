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
const cors = require('cors');
//order traking, user history, user preference, recently viewed
//stored in server side
const session = require('express-session');
//session identifiers, user authentication tokens, and shopping cart contents
//stored in client side
const cookieParser = require('cookie-parser')
//environment variables
const dotenv = require('dotenv').config()


const db = require('./model/index')

// db.sequelize.sync({force: true})

app.set('view engine', 'ejs')
app.set('views', 'view')

app.use(express.json());
app.use(express.urlencoded());

const indexRouter = require('./route/indexroute')
app.use(indexRouter)
const PORT = process.env.PORT || 3000

app.use(session({
    secret : 'GroceryEcommerceWebsite@@##123321##@@GEW',
    resave: true,
    saveUninitialized: true,
}))
app.set('PORT', process.env.PORT || "8080");
app.listen(app.get('PORT'), () => {
    console.log(`Server is running at port ${app.get('PORT')}`);
});
