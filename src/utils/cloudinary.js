import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    const response = await cloduinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })
    console.log("File Uploaded on Cloudinary : ", response)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
    console.log("Error :: Failed to upload File on Cloudinary ", error)
    // throw error
    return null
  }
}

export { uploadOnCloudinary }
