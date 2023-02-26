const {Schema,model} = require('mongoose');
const validator = require('validator');

const userSchema=new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    activity:{
        type:String,
        enum: ['SELL', 'BID'],
        required:[true,"Activity name is required"]
    },
    category: {
        type: String,
        enum: ['House', 'Vehicle', 'Electronics'],
        required: [true, 'Category is required']
    },
    item_name:{
        type:String,
        required:[true,"Item name is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    image:[{type:String}],
    condition:{
        type:String,
        required:[true,"Condition is required"],
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:[true,"Date is required"]
    },
    highest_bidder:{
        type:String,
    },
    end_date:{
        type:Date,
        // required:[true,"Price is Required"]
    },
    isDisable:{
        type: Boolean,
        default: false
    }
});

const userActivity = model('user_Activity',userSchema)
module.exports = userActivity;