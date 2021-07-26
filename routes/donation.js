const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

router.post('/donate',
(req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.send(errors.array());
	}
	else{
		const donorFullName=req.body.donorFullName;
        const donorEmailAddress = req.body.donorEmailAddress;
        const donorContactNumber = req.body.donorContactNumber;
		const donorAddress1 = req.body.donorAddress1;
        const donorAddress2 = req.body.donorAddress2;
        const donorCity = req.body.donorCity;
        const donorPostalCode = req.body.donorPostalCode;
        const donorDonated = req.body.donorDonated;
        
        var donate = new Donation({
            donorFullName:donorFullName,
            donorEmailAddress:donorEmailAddress,
            donorContactNumber:donorContactNumber,
            donorAddress1:donorAddress1,
            donorAddress2: donorAddress2,

            donorCity: donorCity,
            donorPostalCode: donorPostalCode,
            donorDonated: donorDonated,
        });
        donate.save()
        .then(function(data){
            //Success Insert
            res.status(200).json({success:true,data:data,message: "Donated Successfully"});
        })
        .catch(function(err){
            // Internal Server Error
            res.status(500).json({message: "Donation failed, Please Try Again"})
        });
        console.log(donate);
        console.log("Donated Successfully")
	}
});

router.get('/donation/display',(req,res) => {
	Donation.find().then(function(donationDetails){
		res.send(donationDetails);
	})
});
module.exports = router;