module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      email: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};