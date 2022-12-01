const {Schema,model} = require('mongoose');
const validator = require('validator');

const userSchema=new Schema({
user_id: [{ type: Schema.Types.ObjectId, ref: 'users' }],
activity:{
    type:String,
    required:[true,"Activity name is Required"]
},
item_name:{
    type:String,
    required:[true,"Item name is Required"]
},
item_price:{
    type:Number,
    required:[true,"Price is Required"]
},
image:[{
    type:String
}]
,
condition:{
    type:String,
    required:[true,"Condition is Required"],
},
description:{
    type:String
},
isDisable:Boolean
});

exports.default = model('user_Activity',userSchema)