const express = require('express');
const router = express.Router();
const {
  getAllUsers
} = require('../db');

//GET /api/users
router.get('/', async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        nect(error);
    }
});

//GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

});

module.exports = router;