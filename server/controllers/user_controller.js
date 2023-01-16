const Users = require("../models/user_model");
const userActivity = require('../models/user_activity_model');
const jwt = require('jsonwebtoken');

exports.getUsersData = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json({ data });
  } 
  catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneUserData = async (req, res) => {
  try{
    const {Id} = req.params;
    const data = await Users.findById(Id);
    res.status(200).json({data});
  }
  catch(err){
    res.status(400).json({ err: err.Error });
  }
};

exports.loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      throw 'Please provide email and password!';
    }

    const data = await Users.findOne({email, password});

    if(!data) throw new Error('Invalid email or password.');

    const token = jwt.sign({id: data._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    res.status(200).json({token});
  }
  catch(err){
    console.log(err);
    res.status(400).json({ err });
  }
}

exports.createUser = async (req, res) => {
  try {
    let {name, lastname, nic, contact, location, email, password, isDisable} = req.body;
    contact = contact*1;

    const data = await Users.create({name, lastname, nic, contact, location, email, password, isDisable});
    res.status(200).json({ data });
  } 
  catch (err) {
    res.status(400).json({ err });
  }
};

exports.getUsersAds = async (req, res) => {
  try {
    const data = await userActivity.find().populate("user_id");
    res.status(200).json({ data });
  } 
  catch (err) {
    res.status(400).json({ err });
  }
};

exports.addUserActivity = async (req, res) => {
  try{
    const data = await userActivity.create(req.body);
    res.status(200).json({data});
  }
  catch(err){
    res.status(400).json({err});
  }
};