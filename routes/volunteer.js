const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');
const bcrypt = require('bcryptjs');
const volunteer = require('../middleware/uploadsVolunteer');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

//Volunteer Register
router.post('/volunteer/register',volunteer.single('volunteerImage'),(req, res) => {
	console.log("Entered Volunteer Register Route");
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		var error = errors.array();
		return res.status(400).json(error);
	}
	else{
		if(req.file==undefined){
			console.log("\nInvalid Profile Picture Format");
            return res.status(500).json("Invalid Profile Picture Image Format");
        }
		const volunteerImage = req.file.filename;
		const volunteerFullName = req.body.volunteerFullName;
		const volunteerEmailAddress = req.body.volunteerEmailAddress;
		const volunteerDateOfBirth = req.body.volunteerDateOfBirth;
		const volunteerGender = req.body.volunteerGender;
		const volunteerContactNumber = req.body.volunteerContactNumber;
		const volunteerAddress = req.body.volunteerAddress;
		const volunteerPostalCode = req.body.volunteerPostalCode;
		const volunteerNationality = req.body.volunteerNationality;


		var volunteerDetails = new Volunteer({
			volunteerImage: volunteerImage,
			volunteerFullName: volunteerFullName,
			volunteerEmailAddress: volunteerEmailAddress,
			volunteerDateOfBirth: volunteerDateOfBirth,
			volunteerGender: volunteerGender,
			volunteerContactNumber: volunteerContactNumber,
			volunteerAddress: volunteerAddress,
			volunteerPostalCode: volunteerPostalCode,
			volunteerNationality: volunteerNationality
		});
				
	    volunteerDetails.save()
		.then(function(data){
			res.status(201).json({ 
				success: true, message : "Volunteer Registered"
			})
			console.log("Volunteer Registered");
			console.log(volunteerDetails);
		})
		.catch(function(error){
			res.status(500).json({
				message: "Volunteer Registration Failed"
			})
			console.log(error);
			console.log("Volunteer Registration Failed");
		});
	}
});

// Volunteer Display All
router.get('/volunteer/display',(req,res) => {
	Volunteer.find().then(function(volunteerDetails){
		res.send(volunteerDetails);
	})
});

router.get('/volunteer/count',(req,res) => {
	Volunteer.find().count()
	.then(function(volunteerDetails){
		res.send(volunteerDetails);
	})
});

// Volunteer Display Single
router.get("/volunteer/display/:id",function(req,res){    
    const id = req.params.id;
    Volunteer.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(err){
        res.status(500).json({message : err})
    })
});


module.exports = router;