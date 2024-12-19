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
}, {
    timestamps: true,
    tableName: 'korpe',
});

const KorpaProizvod = sequelize.define('KorpaProizvod', {
    korpaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    proizvodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kolicina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1,
        },
    },
}, {
    timestamps: false,
    tableName: 'korpa_proizvodi',
});

Korpa.hasMany(KorpaProizvod, { foreignKey: 'korpaId', onDelete: 'CASCADE' });
KorpaProizvod.belongsTo(Korpa, { foreignKey: 'korpaId' });

module.exports = { Korpa, KorpaProizvod };
