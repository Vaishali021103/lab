const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getbill } = require('../controller/appController.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecert = "VaishaliVeeraswamiSirimallagoodgirl";

router.post(
  '/createuser',
  [
    body('name', "Enter valid name"),
    body('password', "Password error").isLength({ min: 5 }),
    body('email', 'Incorrect mail ID').isEmail(),
    body('confirmpass').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
      console.log(error);
    }
  }
);

router.post(
  '/loginuser',
  [body('email'), body('password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({
        email,
      });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: 'Try logging in with valid credentials' });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: 'Try logging in with valid credentials' });
      }
      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecert)
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post('/product/getbill', getbill);

module.exports = router;
