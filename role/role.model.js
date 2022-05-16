const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    create: {type: String, required: true, enum: true},
    role: { type: String, required: true, enum: true },
    created: { type: Date, default: Date.now },
    updated: Date
});


module.exports = mongoose.model('Role', schema);