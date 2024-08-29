const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


router.post('/register', controllers.register);
router.post('/login', controllers.login);

router.post('/users', controllers.protect, controllers.createUser);
router.get('/users', controllers.protect, controllers.getAllUsers);
router.get('/users/:id', controllers.protect, controllers.getUserById);
router.patch('/users/:id', controllers.protect, controllers.updateUser);
router.delete('/users/:id', controllers.protect, controllers.deleteUser);

module.exports = router;
