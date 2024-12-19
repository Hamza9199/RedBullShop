const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 

const Narudzba = sequelize.define('Narudzba', {
    korisnikId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    adresaId: {
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
    statusNarudzbe: {
        type: DataTypes.ENUM('Na čekanju', 'Obrađuje se', 'Isporučeno', 'Otkazano'),
        defaultValue: 'Na čekanju',
    },
    placanjeMetoda: {
        type: DataTypes.ENUM('Kartica', 'PayPal', 'Pouzećem'),
        allowNull: false,
    },
    placanjeStatus: {
        type: DataTypes.ENUM('Čeka se', 'Uspješno', 'Neuspješno'),
        defaultValue: 'Čeka se',
    },
    transakcijskiId: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValid(value) {
                if (this.placanjeMetoda !== 'Pouzećem' && !value) {
                    throw new Error('Transakcijski ID je obavezan za metode koje nisu Pouzećem');
                }
            },
        },
    },
}, {
    timestamps: true,
    tableName: 'narudzbe',
});

const NarudzbaProizvod = sequelize.define('NarudzbaProizvod', {
    narudzbaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    proizvodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kolicina: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1,
        },
    },
}, {
    timestamps: false,
    tableName: 'narudzba_proizvodi',
});

Narudzba.hasMany(NarudzbaProizvod, { foreignKey: 'narudzbaId', onDelete: 'CASCADE' });
NarudzbaProizvod.belongsTo(Narudzba, { foreignKey: 'narudzbaId' });

module.exports = { Narudzba, NarudzbaProizvod };
