module.exports = {
        host: process.env.HOST,
        db: process.env.NAME,
        username: process.env.USER,
        password: process.env.PASSWORD,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 0,
            idle: 10000,
            acquire: 60000
        }
}
