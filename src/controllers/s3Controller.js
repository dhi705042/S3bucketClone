const BucketModel = require('../models/bucketModel');
const ObjectModel = require('../models/objectModel');


async function createBucket(req, res) {
    const { name } = req.body;
    try {
        const isBucketPresent = await BucketModel.findOne({name})
        if (isBucketPresent){
            return res.status(404).json({ error: 'bucket already present' });
        }
        const bucket = await BucketModel.create({ name });
        res.status(201).json(bucket);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Failed to create a bucket' });
    }
}


async function createObject(req, res) {
    const { bucket } = req.params;
    const { key, data } = req.body;
    try {
        // Check if the specified bucket exists
        const existingBucket = await BucketModel.findOne({ name: bucket });

        if (!existingBucket) {
            return res.status(404).json({ error: 'Bucket not found' });
        }
        const dulicateKey = await ObjectModel.findOne({bucket, key})
        if (dulicateKey){
            return res.status(400).json({ error: `key already assosiated with ${bucket}` });
        }
        const object = await ObjectModel.create({ bucket, key, data });
        res.status(201).json(object);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create an object' });
    }
}


async function getObject(req, res) {
    const { key } = req.params;
    try {
        console.log("key", key)
        const object = await ObjectModel.findOne({ key });
        if (!object) {
            res.status(404).json({ error: 'Object not found' });
        } else {
            res.json(object);
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve the object' });
    }
}


async function updateObject(req, res) {
    const { bucket, key } = req.params;
    const { data } = req.body;
    try {
        // Check if the specified bucket exists
        const existingBucket = await BucketModel.findOne({ name: bucket });

        if (!existingBucket) {
            return res.status(404).json({ error: 'Bucket not found' });
        }

        // Find the object within the existing bucket
        const object = await ObjectModel.findOne({ bucket, key });

        if (!object) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Update the object's data
        object.data = data;
        await object.save();

        res.json({ message: 'Object updated successfully' });
    } catch (error) {
        console.error('Update Object error:', error);
        res.status(400).json({ error: 'Failed to update the object' });
    }
}


async function deleteObject(req, res) {
    const { key } = req.params;
    try {
        const deletedObject = await ObjectModel.findOneAndDelete({ key });
        if (!deletedObject) {
            res.status(404).json({ error: 'Object not found or deleted' });
        } else {
            res.json(deletedObject);
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete the object' });
    }
}


async function listObjects(req, res) {
    const { bucket } = req.params;
    console.log("bucket", bucket)
    try {
        const objects = await ObjectModel.find({ bucket });
        console.log("objects", objects)
        res.json(objects);
    } catch (error) {
        res.status(400).json({ error: 'Failed to list objects in the bucket' });
    }
}


async function listBuckets(req, res) {
    try {
        const buckets = await BucketModel.find();
        res.json(buckets);
    } catch (error) {
        res.status(400).json({ error: 'Failed to list buckets' });
    }
}

module.exports = {
    createBucket,
    createObject,
    getObject,
    updateObject,
    deleteObject,
    listObjects,
    listBuckets,
};
