const express = require ('express')
const app = express()

const userRoutes = require('./routes/userRoutes');

const db = require('./model/index')
db.sequelize.sync({ force: true})


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRoutes);

let port = process.env.port || 3000
app.listen(port, ()=>{
    console.log(`Server is started in ${port}`)
})