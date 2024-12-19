const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 

const Korisnik = sequelize.define('Korisnik', {
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 255],
        },
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            len: [6, 255],
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
            len: [6, 1024],
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    tableName: 'korisnici',
});

module.exports = Korisnik;
