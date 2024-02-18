module.exports = (sequelize, Sequelize) => {

const ThirdPartyIntegration = sequelize.define('ThirdPartyIntegration', {
    integration_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    api_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secret_key: {
        type: Sequelize.STRING
    },
    additional_info: {
        type: Sequelize.JSONB
    }
});

return ThirdPartyIntegration;
}