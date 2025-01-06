const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
    const posts = await Post.findAll({ 
      include: [{ model: User, as: 'User' }] 
    });
    res.json(posts);
  });

// Add this route at the beginning of your routes
router.get('/posts/only', async (req, res) => {
  try {
      const posts = await Post.findAll({
          attributes: ['id', 'title', 'description', 'images', 'createdAt', 'updatedAt']
      });
      res.json(posts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


  router.get('/users',async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Create a post
// Create a post
router.post('/posts', async (req, res) => {
    try {
      const { title, description, userId, images } = req.body;
      console.log('Received request body:', req.body);
      
      const user = await User.findByPk(userId);
      if (!user) {
        console.log('User not found with ID:', userId);
        return res.status(404).json({ error: 'User not found' });
      }
  
      const post = await Post.create({ title, description, userId, images });
      console.log('Created post:', post);
  
      user.postCount += 1;
      await user.save();
  
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Edit a post
// Edit a post
router.put('/posts/:id', async (req, res) => {
  const { title, description, images } = req.body;
  const post = await Post.findByPk(req.params.id);

  if (!post) return res.status(404).send('Post not found');
  Object.assign(post, { title, description, images });
  await post.save();

  res.json(post);
});


// Delete a post
// Delete a post
router.delete('/posts/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) return res.status(404).send('Post not found');
  await post.destroy();

  // Decrement post count for user
  const user = await User.findByPk(post.userId);
  if (user) {
    user.postCount -= 1;
    await user.save();
  }

  res.status(200).json({ message: "Post successfully deleted" });
});


module.exports = router;
