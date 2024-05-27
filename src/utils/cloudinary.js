import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

/*
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // cloud_name: "df8oadkfq",
  api_key: process.env.CLOUDINARY_API_KEY,
  // api_key: "538689426581575",
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // api_secret: "OubobZXMxSMAxhj8wmTaMIyXlYM",
})
*/
const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(process.env.CLOUDINARY_CLOUD_NAME)
    console.log(localFilePath)
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {
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
