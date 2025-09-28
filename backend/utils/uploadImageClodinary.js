import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// console.log("Configuring Cloudinary...");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
})

const uploadImageClodinary = async(image) => {
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        const uploadImage = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "Cloudinary-Rehan-Data" },
                (error, uploadResult) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }
            );
            
            uploadStream.end(buffer);
        });

        return uploadImage;
    } catch (error) {
        console.error('Error in uploadImageClodinary:', error);
        return null;
    }
}

export default uploadImageClodinary
