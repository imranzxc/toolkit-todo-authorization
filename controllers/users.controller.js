const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.usersController = {
  registerUser: async (req, res) => {
    const { login, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

      const user = await User.create({ login: login, password: hash });

      res.json(user);
    } catch (err) {
      res.json({ error: "This user already exists" });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json('Access denied: wrong login');
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json('Access denied: wrong password');
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: process.env.SECRET_JWT_EXPIRATION,
    });

    res.json({
      token: token,
      user: payload.id,
    });
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
    } catch (error) {}
  },
};
