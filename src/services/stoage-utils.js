const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
})

const createBucket = async () => {
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    try{
        const [metadata] = await bucket.getMetadata();
        // Bucket Exists
    }catch(error){
        // Bucket doesn't 
        const createBucketOptions = {
            location: 'ASIA-SOUTHEAST1'
        };

        await bucket.createBucket(process.env.BUCKET_NAME, createBucketOptions);
    }

    return bucket;
}

const upload = async (filePath, fileDestination) => {
    try{
        const optionsUploadObject = {
            destination: fileDestination,
        };
    
        await storage.bucket(process.env.BUCKET_NAME).upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${fileDestination}`);
    }catch(error){
        console.error(error.stack);
    }
    
}

module.exports = {
    createBucket, upload
}