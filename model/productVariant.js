module.exports = (sequelize, Sequelize) => {

    const Productvariant = sequelize.define('ProductVariant', {
        variant_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'product_id'
            }
        },
        sku: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        size: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        quantity_available: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    });
    
    return Productvariant;
    }
    