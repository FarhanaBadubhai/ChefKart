const request = require('supertest');
const app = require('../server');
const { User, Post } = require('../models');

describe('API Tests', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
    await Post.destroy({ where: {} });
  });

  describe('User APIs', () => {
    test('GET /api/users should return all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('POST /api/users should create a new user', async () => {
      const userData = {
        name: 'Test User',
        mobileNumber: 1234567890,
        address: 'Test Address'
      };
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(userData.name);
    });
  });

  describe('Post APIs', () => {
    let testUser;

    beforeEach(async () => {
      testUser = await User.create({
        name: 'Test User',
        mobileNumber: 1234567890,
        address: 'Test Address'
      });
    });

    test('POST /api/posts should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        description: 'Test Description',
        userId: testUser.id,
        images: ['image1.jpg', 'image2.jpg']
      };
      const response = await request(app)
        .post('/api/posts')
        .send(postData);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(postData.title);
    });
  });
});
