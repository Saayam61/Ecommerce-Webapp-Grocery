module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        firstName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        dob: {
            allowNull: false,
            type: Sequelize.DATE
        },
        address: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        }
    })
    return User
}
