module.exports = (sequelize, Sequelize) => {

const Category = sequelize.define('Category', {
    category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Categories',
            key: 'category_id'
        }
    }
});

return Category;
}
