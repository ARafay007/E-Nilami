const { getImageUploadSignedURL } = require('../controllers/s3_signed_url_controller');
const express = require('express');

const router = express.Router();

router.get('/signedURL/:id', getImageUploadSignedURL);

module.exports = router;