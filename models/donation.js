

const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken');

const Donation = mongoose.model('Donation', {
    campaignId: { type: String, require :true},
    campaignName: { type: String, require :true},
    donorFullName: { type: String, require :true},
    donorEmailAddress: { type: String, require:true},
    donorContactNumber: { type: String, require :true},
    donorAddress1: { type: String, require :true},
    donorAddress2: { type: String, require :true},
    donorCity: { type: String, require :true},
    donorPostalCode: { type: String, require :true},
    donorDonated: { type: String, require :true},
    donatedBy: { type: String, default:"Admin"},
    donatedDate:{ type: Date, default: Date.now}
});

module.exports = Donation;
