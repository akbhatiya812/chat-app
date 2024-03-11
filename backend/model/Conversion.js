const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversionSchema = new Schema({
    participents : [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages : [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default : []
    }]
});

module.exports = mongoose.model('Conversion', conversionSchema);

