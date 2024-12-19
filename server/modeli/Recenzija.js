const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 

const Recenzija = sequelize.define('Recenzija', {
    korisnikId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proizvodId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ocjena: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    komentar: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        defaultValue: "Bez komentara",
        validate: {
            len: [0, 1024],
        },
    },
}, {
    timestamps: true,
    tableName: 'recenzije',
});

module.exports = Recenzija;
