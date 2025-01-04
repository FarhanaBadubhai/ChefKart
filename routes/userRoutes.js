const express = require('express');
const { User, Post } = require('../models');

const router = express.Router();

  router.get('/users',async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  
router.post('/users', async (req, res) => {
  const { name, mobileNumber, address } = req.body;
  try {
    const user = await User.create({ name, mobileNumber, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
