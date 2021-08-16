const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.verifyUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeData = jwt.verify(token, 'secretkey');
    User.findOne({ _id: decodeData.userId })
      .then(function (UserAuthenticateData) {
        req.seller = UserAuthenticateData;
        next();
      })
      .catch(function (error) {
        res.status(401).json({ message: error });
      });
  } catch (error) {
    res.status(401).json({ message: error + 'Unauthorized Access' });
  }
};

