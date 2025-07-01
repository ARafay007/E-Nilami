const { getImageUploadSignedURL } = require('../controllers/s3_signed_url_controller');
const express = require('express');

const router = express.Router();

router.get('/signedURL/:id/:imagesQty', getImageUploadSignedURL);

module.exports = router;