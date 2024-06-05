const {
    createBucket, upload
} = require('../services/stoage-utils');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const postUploadHandler = async (request, h)=>{
    const image = request.payload.image;

    // Use this to get the Standard Output
    // - The Output of const {image} = request.payload by default.
    // - Or when options: {payload: { output: 'data' }};
        const imagePath = image.path;
        const imageBuffer = fs.readFileSync(imagePath);
    
// Create File in Temp Storage
    /*
        - Create New File Name
        - Create File Destination
        - Upload File to File Destination
    */

    // 1) Create New File Name
        // Extract the Extension of the File
            const imageName = image.filename;
            const imageExt = imageName.split('.')[1];
        
        // Create Unique Filename
            const randNum = crypto.randomBytes(6).toString('hex');
            const fileName = `temp-img-${randNum}.${imageExt}`;

    // 2) Create File Destination
    const tempStoragePath = path.join(__dirname, '../services/temp/');
    const fileDest = `${tempStoragePath}${fileName}`;

    // 3) Upload File to Destination
    fs.writeFileSync(fileDest, imageBuffer);
    console.log(fileDest);

// Upload File to Bucket
    // Make Sure Bucket Exists
    await createBucket();
    
    // Upload to Bucket
    await upload(fileDest, `${process.env.BUCKET_UPLOAD_PATH}${fileName}`);


// Remove Image from Temp Storage
    fs.unlinkSync(fileDest);

    const response = h.response({
        status: 'success',
        message: `${fileName} uploaded Successfully!`,
        data: {
            url: `https://storage.googleapis.com/${process.env.BUCKET_NAME}/saved-images/${fileName}`,
        }
    })

    response.code(201);

    return response;
}

module.exports = {
    postUploadHandler,
}