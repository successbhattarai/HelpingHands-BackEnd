const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');

//User Register
router.post('/user/register',(req, res) => {
	console.log("Entered Register Route");

	const errors = validationResult(req);

	//When There is Error
	if(!errors.isEmpty()){
		var error = errors.array();
		return res.status(400).json(error);
	}
	else{
		const userFullName = req.body.userFullName;
		const userEmailAddress = req.body.userEmailAddress;
		const userPassword = req.body.userPassword;
		const userContactNumber = req.body.userContactNumber;


		bcrypt.hash(userPassword,10,function(error,hash){

				var userDetails = new User({
					userFullName: userFullName,
					userEmailAddress: userEmailAddress,
					userPassword : hash,
					userContactNumber: userContactNumber,

				});
				userDetails.save()
				.then(function(data){
					res.status(201).json({ 
						success: true, message : "Successfully Registered"
					})
					console.log("User Registered");
					console.log(userDetails);
				})
				.catch(function(error){
					res.status(500).json({
						message: "User Registertion Failed, Please Try Again"
					})
					console.log(error);
					console.log("User Registertion Failed");
				});
		});
	}
});

// User Login
router.post('/user/login',function(req,res){
	
	console.log("Entered Login Route");

	const userEmailAddress = req.body.userEmailAddress;
	const userPassword = req.body.userPassword;

	console.log("\nEmailAddress :", userEmailAddress);
	console.log("userPassword :", userPassword);
    
	User.findOne({userEmailAddress: userEmailAddress})
	.then(function(userModel){

		if(userModel==null){
			return res.status(403).json({
				success:false,
				message : "Invalid Credentials!! Null"})
		}

		//res.send("Login Successful")
		bcrypt.compare(userPassword,userModel.userPassword,function(err,result){

			if (result===false){
				return	res.status(403).json({
					success:false,
					message :"Invalid Credentials!! Result False"})
			}

			console.log("\nValid Login, Generating Token");

			// If Valid Login then Token is Generated
			const token =jsonWebToken.sign({userId:userModel._id},'secretkey');
			console.log("\nToken :", token)
			res.status(200).json({
				success: true,
				token: token,
				id:userModel._id,
				userEmailAddress:userEmailAddress
			})
			console.log("Id",userModel._id)
			console.log("\n",userEmailAddress,"is Logged-in Successfully.")
		})
	})
	.catch()
})


module.exports = router;