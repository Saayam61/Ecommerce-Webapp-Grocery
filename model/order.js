module.exports = (sequelize, Sequelize) => {

const Order = sequelize.define('Order', {
    order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    order_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    shipping_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shipping_method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Payments',
            key: 'payment_id'
        }
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

return Order;
}
