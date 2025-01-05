const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Improved database connection handling
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;

