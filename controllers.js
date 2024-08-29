const User = require('./models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ token });
  } catch (err) {
    res.status(500).send({ message: 'Registration failed', error: err.message });
  }
};

// Log in a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: 'Login failed', error: err.message });
  }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).send({ message: 'Not authorized, token failed' });
  }
};




exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid request', errors: err.errors });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid request', errors: err.errors });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();
    res.status(204).send({ message: 'User deleted Successffully' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};