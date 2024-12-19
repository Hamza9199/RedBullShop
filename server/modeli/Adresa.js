const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance')
const Korisnik = require('./Korisnik')

const Adresa = sequelize.define('Adresa', {
    korisnikId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ulica: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    grad: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    postanskiBroj: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    drzava: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'adrese', 
});

Korisnik.hasMany(Adresa, { foreignKey: 'korisnikId' });
Adresa.belongsTo(Korisnik, { foreignKey: 'korisnikId' });

module.exports = Adresa;
