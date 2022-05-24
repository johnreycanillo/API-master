const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    create: {type: String, required: true },
    status: { type: String, enum: ['enable','disable'], default: 'enable' },
    created: { type: Date, default: Date.now },
    updated: Date
});


module.exports = mongoose.model('Role', schema);