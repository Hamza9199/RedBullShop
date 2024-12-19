const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 

const Proizvod = sequelize.define('Proizvod', {
    naziv: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [2, 255],
        },
    },
    opis: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "Nema opisa",
        validate: {
            len: [2, 255],
        },
    },
    kategorija: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
            len: [2, 1024],
        },
    },
    cijena: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    slikaURL: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [6, 255],
        },
    },
}, {
    timestamps: true,
    tableName: 'proizvodi',
});

module.exports = Proizvod;
