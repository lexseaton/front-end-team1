import AWS from "aws-sdk";
import express from "express";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export const upload = async (req: express.Request) => {
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: Date.now().toString() + '-' + req.file.originalname,
        Body: req.file.buffer
    };

    const data = await s3.upload(uploadParams).promise();

    return data.Location;
}