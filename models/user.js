

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema( {

    // Personal Details
    userFirstName: { type: String, require :true},
    userLastName: { type: String, require :true},
    userEmailAddress: { type: String, require:true, unique:true },
    userContactNumber: { type: String, require :true},
    userPassword: { type: String, require :true},
    restLink:{
        data:String,
        default:''}
});

module.exports = mongoose.model('User',userSchema);

