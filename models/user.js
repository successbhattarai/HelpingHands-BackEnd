

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema( {

    // Personal Details
    userFullName: { type: String, require :true},
    userBalance: { type: String, require :true},
    userEmailAddress: { type: String, require:true, unique:true },
    userContactNumber: { type: String, require :true},
    userPassword: { type: String, require :true},
    resetLink:{
        data:String,
        default:''}
});

module.exports = mongoose.model('User',userSchema);

