const mongoose = require('mongoose')


const objectSchema = new mongoose.Schema({
    bucket: { type: String, required: true },
    key: { type: String, required: true },
    data: { type: String, required: true },
});

const ObjectModel = mongoose.model('Object', objectSchema);

module.exports = ObjectModel;