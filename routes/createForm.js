const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Form,createForm} = require('../models/form')


router.post('/',async (req,res)=>{
    const result =await createForm(req);
   res.status(200).send(result);
})

module.exports = router; 

