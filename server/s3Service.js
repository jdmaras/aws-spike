const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4

                    //pass in file
const s3Uploadv2 = async (file) => {
    //lowercase equal to the imported S3
    const s3 = new S3()
    console.log('this be the buff', file)
    const param = {
        //because bucket name is environment variable - it's found in .env
        Bucket: process.env.AWS_BUCKET_NAME,
        //this will upload to the folder 'uploads' with the unique key and file name
        Key: `uploads/${uuid()}-${file.originalname}`,
        //buffer object - file in memory take the file from the client and we provide buffer for aws
        Body: file.buffer,
        //to make s3 know what type of file it is
        // separate what type of video files we want to accept here
        ContentType: 'video/mp4, image/jpeg',
        
    }
            //callback based but can turn it into a promise
    return await s3.upload(param).promise();
}

module.exports = s3Uploadv2;