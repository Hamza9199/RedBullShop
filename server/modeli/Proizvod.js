const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 

const Proizvod = sequelize.define('Proizvod', {
    naziv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "Nema opisa",
    },
    kategorija: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cijena: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    slikaURL: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
}, {
    timestamps: true,
    tableName: 'proizvodi',
});

module.exports = Proizvod;
