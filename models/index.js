const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {
  sequelize,
  Sequelize,
};

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);

db.User.hasMany(db.Post, { foreignKey: 'userId' });
db.Post.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
