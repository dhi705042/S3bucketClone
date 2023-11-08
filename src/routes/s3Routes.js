const express = require('express');
const router = express.Router();
const S3Controller = require('../controllers/s3Controller');
const requireAuth = require('../middleware/authMiddleware');

// Create a new bucket
router.post('/buckets', requireAuth, S3Controller.createBucket);

// List all objects in a bucket
router.get('/objects/:bucket', requireAuth, S3Controller.listObjects);

// Create a new object in a bucket
router.post('/objects/:bucket', requireAuth, S3Controller.createObject);

// Get an object by its key 
router.get('/object/:key', requireAuth, S3Controller.getObject);

// Delete an object by its key
router.delete('/object/:key', requireAuth, S3Controller.deleteObject);

// Update an object by its key
router.put('/objects/:bucket/:key', S3Controller.updateObject);


// List all buckets
router.get('/buckets', requireAuth, S3Controller.listBuckets);

module.exports = router;
