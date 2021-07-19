

const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken');

const Volunteer = mongoose.model('Volunteer', {

    volunteerImage: { type: String, require :true},
    volunteerFullName: { type: String, require :true},
    volunteerEmailAddress: { type: String, require:true, unique:true },
    volunteerDateOfBirth: { type: String, require :true},
    volunteerGender: { type: String, require :true},
    volunteerContactNumber: { type: String, require :true},
    volunteerAddress: { type: String, require :true},
    volunteerPostalCode: { type: String, require :true},
    volunteerNationality: { type: String, require :true}
});

module.exports = Volunteer;
