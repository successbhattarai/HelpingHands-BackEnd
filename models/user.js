

const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken');

const User = mongoose.model('User', {

    // Personal Details
    userFullName: { type: String, require :true},
    userBalance: { type: String, default:"1000"},
    userEmailAddress: { type: String, require:true, unique:true },
    userContactNumber: { type: String, require :true, unique:true},
    userPassword: { type: String, require :true},
});

module.exports = User;
