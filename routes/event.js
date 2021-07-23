const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const bcrypt = require('bcryptjs');
const event = require('../middleware/uploads');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

//Event Register
router.post('/event/insert',event.single('eventImage'),(req, res) => {
	console.log("Entered Event Insert Route");
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		var error = errors.array();
		return res.status(400).json(error);
	}
	else{
		if(req.file==undefined){
			console.log("\nInvalid Event Picture Format");
            return res.status(500).json("Invalid Event Picture Image Format");
        }
		const eventImage = req.file.filename;
		const eventName = req.body.eventName;
		const eventShortDescription = req.body.eventShortDescription;
		const eventAttendees = req.body.eventAttendees;
		const eventDate = req.body.eventDate;
		const eventMonth = req.body.eventMonth;
		const eventYear = req.body.eventYear;
		const eventCategories = req.body.eventCategories;
		const eventLocation = req.body.eventLocation;
		const eventFullDescription = req.body.eventFullDescription;
		


		var Post = new Event({
			eventImage: eventImage,
			eventName: eventName,
			eventShortDescription: eventShortDescription,
			eventAttendees: eventAttendees,
			eventDate: eventDate,
			eventMonth: eventMonth,
			eventYear: eventYear,
			eventCategories: eventCategories,
			eventLocation: eventLocation,
			eventFullDescription: eventFullDescription,
			
		});
				
	    Post.save()
		.then(function(data){
			res.status(201).json({ 
				success: true, message : "Event Added"
			})
			console.log("Event Added");
			console.log(Post);
		})
		.catch(function(error){
			res.status(500).json({
				message: "Event Addition Failed"
			})
			console.log(error);
			console.log("Event Addition Failed");
		});
	}
});

router.get('/event/display',(req,res) => {
	Event.find()
	.then(function(Post){
		res.send(Post);
	})
});

router.get('/event/display/education',(req,res) => {
	var education = { eventCategories: "Education" };
	Event.find(education)
	.then(function(Post){
		res.send(Post);
	})
});

// User Display Single
router.get("/event/display/:id",function(req,res){    
    const id = req.params.id;
    Event.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(err){
        res.status(500).json({message : err})
    })
});



module.exports = router;