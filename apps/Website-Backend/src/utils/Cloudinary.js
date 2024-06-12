import { config, uploader } from 'cloudinary';
import { unlinkSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();


config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file to Cloudinary
        const result = await uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // File has been successfully uploaded
        // console.log("File is uploaded to Cloudinary", result.url);
        unlinkSync(localFilePath)
        return result;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation got failed
        unlinkSync(localFilePath);
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
};

export default uploadOnCloudinary;
