const User = require('../models/user');
const _= require('lodash')
const jwt =require('jsonwebtoken');
const mailgun = require('mailgun-js')
const DOMAIN='sandboxdcad29f2a7ba4aba8110929f739d0618.mailgun.org';
const mg = mailgun({apiKey:process.env.MAILGUN_APIKEY, domain:DOMAIN});

exports.signup=(req, res)=>{
    const{userFirstName,userEmailAddress,userPassword,userContactNumber}=req.body;
    User.findOne({userEmailAddress}).exec((err,user) =>{
        if(user)
        {
            return res.status(400).json({error:"user with this userEmailAddress already exists"});
        }
        


const token=jwt.sign({userFirstName,userEmailAddress,userPassword,userContactNumber},process.env.JWT_ACC_ACTIVATE,{expiresIn:'20m'});
const data={
    from:'bar@example.com',
    to:userEmailAddress,
    subject:'hello',
    html:`
    <h2> Please click on given link to activate your account</h2>
    <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
    `};
    mg.messages().send(data,function(error,body){
        if(error){
            return res.status(400).json({error:'user with this Email Address is not found'});
        }
    return res.json({message:'Email has been sent, kindly activate your account'})
});
});
}
    exports.activateAccount=(req, res)=>{
        const{token}=req.body;
        if(token){
            jwt.verify(token,process.env.JWT_ACC_ACTIVATE, function(err,decodedToken){
                if(err){
                    return res.status(400).json({error:'Incorrect or Expired link.'})
                }
                const{userFirstName,userEmailAddress,userPassword,userContactNumber}=decodedToken;
                User.findOne({userEmailAddress}).exec((err,user)=>
                {
                    if(user){
                        return res.status(400).json({error:'user with this Email Address already exits'});
                    }
                    let newUser= new User({userFirstName,userEmailAddress,userPassword,userContactNumber});
                    newUser.save((err,success)=>{
                        if(err){
                            console.log("Error is signup :",err);
                            return res.status(400).json({error:err})
                        }
                        res.json({
                            message:"Signup Successful"
                        })
                    })
                
                })
            
            
            })

        }else{
            return res.json({error:"something went wrong!!!"})
        }
    }


    //forget password
    exports.forgetPassword =(req,res)=>{
        const {userEmailAddress}=req.body;
       
       User.findOne({userEmailAddress},(err,user)=>{
        if(err || !user){
            return res.status(400).json({error:'user with this Email Address does not exits'});
        }
        const token=jwt.sign({_id:user._id},process.env.RESET_PASSWORD_KEY,{expiresIn:'20m'});
const data={
    from:'noreply@hello.com',
    to:userEmailAddress,
    subject:'hello',
    html:`
    <h2> Please click on given link to rest your password</h2>
    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
    `};
    return user.updateOne({resetLink:token},function(err,success){
        if(err){
            return res.status(400).json({error:"reset password link error"});
        }else{   
             mg.messages().send(data,function(error,body){
            if(error){
                return res.status(400).json({error:'user with this Email Address is not found'});
            }
        return res.json({message:'Email has been sent, kindly activate your account'})
    });

        }
    })
    
       });
       
    

       
       }

       exports.resetPassword =(req,res)=>{
        const {resetLink,newPass}=req.body;
        if(resetLink){
            jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY,function(error,decodedData)
            {
                if(error){
                    return res.status(401).json({
                        error:"Incorrect token or it is expired"
                    })
                }
                User.findOne({resetLink},(err,user)=>{
                    if(err || !user){
                        return res.status(400).json({error:'user with this token does not exits'});
                    }
                    const obj={
                        userPassword:newPass,
                        resetLink:''
                    }
                    user =_.extend(user,obj);
                    user.save((err,result)=>{
                        if(err){
                            return res.status(400).json({error:"reset password  error"});
                        }else{   
                           
                        return res.json({message:'Your password has been changed'});
                        }
                    });
                });
            });
                
                    }

    

        else{
            return res.status(400).json({error:'Authentication error'});

        }
    }


    