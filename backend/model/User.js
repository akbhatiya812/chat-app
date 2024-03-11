const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic : String,
    gender : {
        type: String,
        required: true,
        enum : ["male", "female"],
    },
    conversions : [{
        type: Schema.Types.ObjectId,
        ref: 'Conversion'
    }]
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema);
