const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../helpers/banco');

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    //Tipo de em String
    type: DataTypes.STRING,
    //Campo não pode ser nulo
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    //Email de ver unico
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Usuario;