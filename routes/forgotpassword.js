const Joi = require('joi');
const nodemailer = require ('nodemailer');
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

let transeporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"Sathish13898@gmail.com",
        pass:"bhavani.K1526"
    }
})

router.post('/',async(req,res)=>{
    let { error } = validate(req.body);
    if(error) return res.status(400).send('Enter the proper username');

    let user = await User.findOne({username : req.body.username});
    if(!user) return res.status(404).send("user does not exsist");

    const token = user.generateAuthToken();
    console.log(user.email);
    const option = {
        from:"sathish13898@gmail.com",
        to:user.email,
        subject:"Reset your password",
        text:"To reset your password use the link given below:",
        html:`<a href="http://localhost:3000/resetpassword/${token}">Click Here</a>`
    }
    transeporter.sendMail(option,function (err,data){
        if(err){
            console.log('error'+ err);
        }else{
            res.header("x-auth-token",token).status(200).send("email as been sended");
            console.log('email send!!');
        }
})

function validate(req){
    let schema = {
        username : Joi.string().required().min(5).max(255)
    } 
    return Joi.validate(req, schema);

}
})


module.exports = router;