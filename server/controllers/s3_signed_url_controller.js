const {v4: uuidv4} = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

exports.getImageUploadSignedURL = async (req, res) => {
    try{
        const {id, imagesQty} = req.params;

        for(let i=0; i<imagesQty; i++){
            const key = `${id}/${uuidv4()}.jpeg`;
    
            s3.getSignedUrl(
                'putObject', 
                {
                    Bucket: 'e-nilami',
                    ContentType: 'image/jpeg',
                    Key: key,
                },
                (error, url) => {
                    if(error){                   
                        throw new Error(error);
                    }
    
                    res.status(200).json({key, url});
                }
            )
        }
    }
    catch(err){
        res.status(400).json({ err: err.Error });
    }
};