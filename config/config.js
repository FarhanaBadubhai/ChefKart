require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin1',
    database: process.env.DB_NAME || 'user_posts_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', // Use 'postgres' instead of 'mysql'
    port: 5432,          // Default port for PostgreSQL
  },
};
