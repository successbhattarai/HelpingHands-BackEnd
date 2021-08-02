const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const bcrypt = require('bcryptjs');
const campaign = require('../middleware/uploadsCampaign');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

//Campaign Post
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
		const campaignPostedBy = req.body.campaignPostedBy;
		


		var Post = new Campaign({
			campaignImage: campaignImage,
			campaignName: campaignName,
			campaignShortDescription: campaignShortDescription,
			campaignGoal: campaignGoal,
			campaignDays: campaignDays,
			campaignCategories: campaignCategories,
			campaignTags: campaignTags,
			campaignFullDescription: campaignFullDescription,
			campaignPostedBy : campaignPostedBy,
			
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

// Campaign All Display
router.get('/campaign/display',(req,res) => {
	Campaign.find().then(function(Post){
		res.send(Post);
	})
});

// Campaign Limit 3
router.get('/campaign/display/limit=3',(req,res) => {
	Campaign.find().limit(3)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Latest
router.get('/campaign/latest/limit=2',(req,res) => {
	var mysort = { campaignPostDate: -1 };
	Campaign.find().sort(mysort).limit(2)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Latest
router.get('/campaign/latest/limit=3',(req,res) => {
	var mysort = { campaignPostDate: -1 };
	Campaign.find().sort(mysort).limit(3)
	.then(function(Post){
		res.send(Post);
	})
});

// My BLog Display
router.get("/my-campaign/display/:id",function(req,res){    
    const id = req.params.id;
	console.log(id)
	var mycampaign = { campaignPostedBy: id };
	Campaign.find(mycampaign)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Category : Education
router.get('/campaign/display/education',(req,res) => {
	var education = { campaignCategories: "Education" };
	Campaign.find(education)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Category : Education
router.get('/campaign/display/environment',(req,res) => {
	var environment = { campaignCategories: "Environment" };
	Campaign.find(environment)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Category : Medical Expenses
router.get('/campaign/display/medical-expenses',(req,res) => {
	var medical = { campaignCategories: "Medical Expenses" };
	Campaign.find(medical)
	.then(function(Post){
		res.send(Post);
	})
});

// Campaign Display Single
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