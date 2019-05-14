module.exports = function (sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    link: DataTypes.TEXT,
    address: DataTypes.STRING,
    pet_types: DataTypes.STRING,
    host_name: DataTypes.STRING
  });

  Events.associate = function (models) {
    //event should belong to a user
    Events.belongsTo(models.newUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Events;
};
