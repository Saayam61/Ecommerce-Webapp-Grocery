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
        phone: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        }
    })
    return User
}
