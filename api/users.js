const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserByUsername, 
  getUserById,
  createUser
} = require('../db');

//GET /api/users
router.get('/', async (req, res, next) => {
  console.log("Made it to users page");
    try {
        const allUsers = await getAllUsers();
        console.log("users:", allUsers);
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
});

//GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        res.send(user);
    } catch (error) {
        next (error);
    }
});

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await createUser({
        username,
        password: hashedPassword
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

// POST /api/users/login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;