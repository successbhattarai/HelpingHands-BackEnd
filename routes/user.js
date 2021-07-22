const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jsonWebToken = require('jsonwebtoken');


const {signup,activateAccount} = require("../middleware/auth");
//User Register
router.post('/user/register',signup);

//email-activate
router.post('/user/email-activate',activateAccount);


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