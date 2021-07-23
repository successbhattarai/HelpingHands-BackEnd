const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const bcrypt = require('bcryptjs');
const campaign = require('../middleware/uploads');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

//Campaign Register
router.post('/campaign/insert',campaign.single('campaignImage'),(req, res) => {
	console.log("Entered Campaign Insert Route");
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		var error = errors.array();
		return res.status(400).json(error);
	}
	else{
		if(req.file==undefined){
			console.log("\nInvalid Campaign Picture Format");
            return res.status(500).json("Invalid Campaign Picture Image Format");
        }
		const campaignImage = req.file.filename;
		const campaignName = req.body.campaignName;
		const campaignShortDescription = req.body.campaignShortDescription;
		const campaignGoal = req.body.campaignGoal;
		const campaignDays = req.body.campaignDays;
		const campaignCategories = req.body.campaignCategories;
		const campaignTags = req.body.campaignTags;
		const campaignFullDescription = req.body.campaignFullDescription;
		


		var Post = new Campaign({
			campaignImage: campaignImage,
			campaignName: campaignName,
			campaignShortDescription: campaignShortDescription,
			campaignGoal: campaignGoal,
			campaignDays: campaignDays,
			campaignCategories: campaignCategories,
			campaignTags: campaignTags,
			campaignFullDescription: campaignFullDescription,
			
		});
				
	    Post.save()
		.then(function(data){
			res.status(201).json({ 
				success: true, message : "Campaign Added"
			})
			console.log("Campaign Added");
			console.log(Post);
		})
		.catch(function(error){
			res.status(500).json({
				message: "Campaign Addition Failed"
			})
			console.log(error);
			console.log("Campaign Addition Failed");
		});
	}
});

router.get('/campaign/display',(req,res) => {
	Campaign.find().then(function(Post){
		res.send(Post);
	})
});

router.get('/campaign/display/education',(req,res) => {
	var education = { campaignCategories: "Education" };
	Campaign.find(education)
	.then(function(Post){
		res.send(Post);
	})
});

// User Display Single
router.get("/campaign/display/:id",function(req,res){    
    const id = req.params.id;
    Campaign.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(err){
        res.status(500).json({message : err})
    })
});



module.exports = router;