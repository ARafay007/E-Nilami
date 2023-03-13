const fs = require('fs').promises;
const Users = require("../models/user_model");
const userActivity = require('../models/user_activity_model');
const jwt = require('jsonwebtoken');
const { dirname } = require('path');
const path = require('path');
const appDir = dirname(require.main.filename);

const convertImgToBase64 = (img) => {
    const file = fs.readFile(`${appDir}/public/images/${img}`, 'base64', (err, data) => {
      if(err) return;
  
      const base64Img = new Buffer.from(data, 'binary').toString('base64');
      return base64Img;
    });
    
    return file;
};

const loopingCategories = async (category) => {
  const imageBase64Array = []
  
  for await (let obj of category){
    for await (let img of obj.image){
      const extensionName = path.extname(img);
      const base64Img = await convertImgToBase64(img);
      const base64ImgStr = `data:image/${extensionName.split('.')[1]};base64,${base64Img}`;
      imageBase64Array.push(base64ImgStr);
    }
    obj.image = [...imageBase64Array];
  }

  return category;
}

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

exports.getOneUserAds = async (req, res) => {
  try{
    const {Id} = req.params;
    let data = await userActivity.find({user_id: Id});

    for await(let obj of data){
      const extensionName = path.extname(obj.image[0]);
      const base64Img = await convertImgToBase64(obj.image[0]);
      const base64ImgStr = `data:image/${extensionName.split('.')[1]};base64,${base64Img}`;
      obj.image[0] = base64ImgStr;
    }

    res.status(200).json({data});
  }
  catch(err){
    res.status(400).json({error: 'No data found.'});
  }
};

exports.loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      throw 'Please provide email and password!';
    }

    const data = await Users.findOne({email, password});

    if(!data) throw 'Invalid email or password.';

    const token = jwt.sign({id: data._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    res.status(200).json({token, data});
  }
  catch(err){
    res.status(400).json({ err });
  }
}

exports.createUser = async (req, res) => {
  try {
    let {name, lastname, nic, contact, location, email, password, username, isDisable} = req.body;

    const data = await Users.create({name, lastname, nic, contact, location, email, password, username, isDisable});
    res.status(200).json({ data });
  } 
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsersAds = async (req, res) => {
  try {
    let vehicleData = await userActivity.find({category: 'Vehicle', activity: 'SELL', isDisable: false}).populate("user_id");
    let electronicsData = await userActivity.find({category: 'Electronics', activity: 'SELL', isDisable: false}).populate("user_id");
    let houseData = await userActivity.find({category: 'House', activity: 'SELL', isDisable: false}).populate("user_id");

    let imageBase64Array = [];
    
    vehicleData = await loopingCategories(vehicleData);

    imageBase64Array = []
    electronicsData = await loopingCategories(electronicsData);

    imageBase64Array = []
    houseData = await loopingCategories(houseData);
    
    res.status(200).json({ data: {Vehicle: [...vehicleData], Electronics: [...electronicsData], House: [...houseData]} });
  } 
  catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAuctionList = async (req, res) => {
  try{
    //check whether auction has expired or not
    const date = new Date();
    await userActivity.updateMany({end_date: { $lt: date.getTime() }}, {isDisable: true});
    let data = await userActivity.find({activity: 'BID', isDisable: false}).populate("user_id");
    data = await loopingCategories(data);
    res.status(200).json({data});
  }
  catch(error){
    res.status(400).json({error});
  }
};

exports.placeBid = async (req, res) => {
  try{
    let {id: _id} = req.params;
    let {user_id, name, bid} = req.body;
    bid *= 1;

    let data = await userActivity.findOneAndUpdate({_id}, {$push: {highest_bidder: {user_id, name, bid}}}, {new: true});
    console.log(data);
    res.status(200).json({msg: 'Bid placed successfully.'});
  }
  catch(error){
    res.status(400).json({error});
  }
};

exports.addUserActivity = async (req, res) => {
  try{
    if(req.body.activity === 'BID'){
      const timeStamp = JSON.parse(req.body.date);
      const date = new Date(timeStamp);
      date.setDate(date.getDate() + 1);
      req.body.end_date = date.getTime();
    }

    let data = await userActivity.create(req.body);
    res.status(200).json({data});
  }
  catch(err){
    res.status(400).json({err});
  }
};