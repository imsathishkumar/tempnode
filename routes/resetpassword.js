const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const express = require("express");
const Joi = require('joi');
const auth = require('../models/auth')
const router = express.Router();

router.post('/',auth,async(req,res)=>{
    try{
        
        const { error } = validate(req.body);
        if (error) return res.status(400).send("enter your password properly");
        let user =await User.findOne({username: req.user.username});
        if (!user) return res.status(400).send("Invalid username");

        const salt = await bcrypt.genSalt(10);
        user.password =await bcrypt.hash(req.body.password, salt);
        user = await user.save();
        res.status(200).send(user);
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }

})
function validate(req){
    const schema = {
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req,schema);
}
module.exports = router;