const User = require('../models/user');
const jwt =require('jsonwebtoken');
const mailgun = require('mailgun-js')
const DOMAIN='sandbox71e3804024f44659b2e2b132b2952cb5.mailgun.org';
const mg = mailgun({apiKey:process.env.MAILGUN_APIKEY, domain:DOMAIN});

exports.signup=(req, res)=>{
    const{userFirstName,userEmailAddress,userPassword}=req.body;
    User.findOne({userEmailAddress}).exec((err,user) =>{
        if(user)
        {
            return res.status(400).json({error:"user with this userEmailAddress already exists"});
        }
        


const token=jwt.sign({userFirstName,userEmailAddress,userPassword},process.env.JWT_ACC_ACTIVATE,{expiresIn:'20m'});




const data={
    from:'noreply@hello.com',
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
                const{userFirstName,userEmailAddress,userPassword}=decodedToken;
                User.findOne({userEmailAddress}).exec((err,user)=>
                {
                    if(user){
                        return res.status(400).json({error:'user with this Email Address already exits'});
                    }
                    let newUser= new User({userFirstName,userEmailAddress,userPassword});
                    newUser.save((err,success)=>{
                        if(err){
                            console.log("Error is signup :",err);
                            return res.status(400),json({error:err})
                        }
                        res.json({
                            message:"Signup Successful"
                        })
                    }
                    )
                
                })
            
            
            })

        }else{
            return res.json({error:"something went wrong!!!"})
        }
    }