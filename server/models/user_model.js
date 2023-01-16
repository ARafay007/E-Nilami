const {Schema,model} = require('mongoose');
const validator = require('validator');

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    lastname:{
        type:String,
        required:[true,"Father's name is Required"]
    },
    nic:{
        type:String,
        required:[true,"NIC name is Required"],
        maxlenght:15
    },
    contact:{
        type:String,
        required:[true,"Phone Number is Required"],
        maxlength:11
    },
    image:String
    ,
    location:{
        type:String,
        required:[true,"Location is Required"],
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Provide a proper email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minlength:6,
        maxlength:12
    },
    username:{
        type:String,
        // required:[true,"username is Required"],
        minlength:6,
        unique:true,
        lowercase:true
    },

    isDisable:{
        type: Boolean,
        default: false
    }
});

const Users = model('users',userSchema);

module.exports = Users;