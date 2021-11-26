const mongoose = require('mongoose');
const express = require('express');
const { Form, deleteItem } = require("../models/form")
const router = express.Router();


router.delete('/:id',async (req,res)=>{
   const result =await deleteItem(req);
   res.status(200).send(result);
})


module.exports = router; 