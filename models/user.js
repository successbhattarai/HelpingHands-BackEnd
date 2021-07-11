

const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken');

const User = mongoose.model('User', {

    // Personal Details
    userFirstName: { type: String, require :true},
    userLastName: { type: String, require :true},
    userEmailAddress: { type: String, require:true, unique:true },
    userContactNumber: { type: String, require :true, unique:true},
    userPassword: { type: String, require :true},
});

module.exports = User;
