const fs = require('fs');
const Users = require("../models/user_model");
const userActivity = require('../models/user_activity_model');
const jwt = require('jsonwebtoken');
const { dirname } = require('path');
const path = require('path');
const appDir = dirname(require.main.filename);

const convertImgToBase64 = (img) => {
  const bitmap = fs.readFileSync(`${appDir}/public/images/${img}`)
  let extensionName = path.extname(img);

  const base64Img = new Buffer.from(bitmap, 'binary').toString('base64');
  const base64ImgStr = `data:image/${extensionName.split('.')[1]};base64,${base64Img}`;
  return base64ImgStr;
};

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
    data = data.map(el => {
      el.image[0] = convertImgToBase64(el.image[0]);
      return el;
    });
    
    console.log(data);
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

    let vehicleData = await userActivity.find({category: 'Vehicle'}).populate("user_id");
    let electronicsData = await userActivity.find({category: 'Electronics'}).populate("user_id");
    let houseData = await userActivity.find({category: 'House'}).populate("user_id");

    vehicleData = vehicleData.map(el => {
      // el.image = el.image.map(img => {
      //   const base64Array = [];
      //   const bitmap =  fs.readFile(`${appDir}/public/images/${img}`, 'base64', (err, data) => {
      //     if(err) {
      //       console.log('====>>>>');
      //       return err;
      //     }

      //     let extensionName = path.extname(img);
      //     const base64Img =  new Buffer.from(data, 'binary').toString('base64');
      //     const base64ImgStr = `data:image/${extensionName.split('.')[1]};base64,${base64Img}`;
      //     base64Array.push(base64ImgStr);
      //     // return base64ImgStr;
      //   });
      //   Promise.all(bitmap)
      //          .then(() => (base64Array))
      //          .catch(err => {console.log(err)});
      //   // return bitmap;
      // });

      el.image = el.image.map(img => convertImgToBase64(img));
      return el; 
    });

    electronicsData.forEach(el => {
      el.image = el.image.map(img => convertImgToBase64(img));
      return el;
    });

    houseData.forEach(el => {
      el.image = el.image.map(img => convertImgToBase64(img));
      return el;
    });

    const data = {Vehicle: [...vehicleData], Electronics: [...electronicsData], House: [...houseData]};

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