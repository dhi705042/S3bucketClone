const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const BucketModel = mongoose.model('Bucket', bucketSchema);

module.exports = BucketModel;