module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      email: {
        allowNull: false,
        type: Sequelize.STRING(),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};