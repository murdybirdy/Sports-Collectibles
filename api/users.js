const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const { username, password, isAdmin } = req.body;
  
    try {
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await createUser({
        username,
        password: hashedPassword,
        isAdmin
      });
  
      const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET);
      res.status(201).json({message: "User created successfully!", user: newUser, token });

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
      console.log(passwordsMatch)
      if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      };

      console.log("from api/user.js: user:", user);
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
      res.status(201).json({ message: 'Login successful', user: user, token });
      
    } catch (error) {
      next(error);
    }
  });

module.exports = router;