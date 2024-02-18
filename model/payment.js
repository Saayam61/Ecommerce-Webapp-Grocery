module.exports = (sequelize, Sequelize) => {

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'order_id'
        }
    },
    payment_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    payment_method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transaction_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

return Payment;
}
