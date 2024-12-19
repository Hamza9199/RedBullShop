const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance')

const Korpa = sequelize.define('Korpa', {
    korisnikId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ukupnaCijena: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    proizvodi: {
        type: DataTypes.JSON,  
        allowNull: false,
        defaultValue: [],
    }
}, {
    timestamps: true,
    tableName: 'korpe',
});


module.exports = Korpa ;
