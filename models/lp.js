// lp models

module.exports = function(sequelize, DataTypes) {
    var lp = sequelize.define("lp", {
      item_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      message: DataTypes.INTEGER
    });
    return lp;
  };
  