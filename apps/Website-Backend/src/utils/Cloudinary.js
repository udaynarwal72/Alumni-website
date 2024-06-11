import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET  // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        //file has been sucessfully uploaded
        console.log("file is uploaded o cloudinary", response.url)
        return response
    }
    catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary };