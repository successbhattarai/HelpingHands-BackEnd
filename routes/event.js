const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const bcrypt = require('bcryptjs');
const event = require('../middleware/uploadsEvent');
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
		const eventPostedBy = req.body.eventPostedBy;
		


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
			eventPostedBy : eventPostedBy,
			
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

router.get('/event/display/limit=3',(req,res) => {
	Event.find().limit(3)
	.then(function(Post){
		res.send(Post);
	})
});

router.get("/my-event/display/:id",function(req,res){    
    const id = req.params.id;
	console.log(id)
	var myevent = { eventPostedBy: id };
	Event.find(myevent)
	.then(function(Post){
		res.send(Post);
	})
});

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

// Event Category Wise
// Event Category : Entertainment
router.get('/event/display/entertainment',(req,res) => {
	var entertainment = { eventCategories: "Entertainment" };
	Event.find(entertainment)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Social
router.get('/event/display/social',(req,res) => {
	var social = { eventCategories: "Social" };
	Event.find(social)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Sports
router.get('/event/display/sports',(req,res) => {
	var sports = { eventCategories: "Sports" };
	Event.find(sports)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Religious
router.get('/event/display/religious',(req,res) => {
	var religious = { eventCategories: "Religious" };
	Event.find(religious)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Educational
router.get('/event/display/educational',(req,res) => {
	var educational = { eventCategories: "Educational" };
	Event.find(educational)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Political
router.get('/event/display/political',(req,res) => {
	var political = { eventCategories: "Political" };
	Event.find(political)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Charitable
router.get('/event/display/charitable',(req,res) => {
	var charitable = { eventCategories: "Charitable" };
	Event.find(charitable)
	.then(function(Post){
		res.send(Post);
	})
});

// Event Category : Others
router.get('/event/display/others',(req,res) => {
	var others = { eventCategories: "Others" };
	Event.find(others)
	.then(function(Post){
		res.send(Post);
	})
});



module.exports = router;