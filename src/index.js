import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { v2 as cloudinary } from "cloudinary"

import { app } from "./app.js"

dotenv.config()
// dotenv.config({
//   path: "./.env",
// })

//cloudinary configuration

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//connectingDB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("Error MongoDB Connection failed :: index.js :: ", error)
  })

//Connecting DB index.js
/*
;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERROR Occured :: index.js", error)
    })
  } catch (error) {
    console.log("error :: catch ", error)
    throw error
  }
})()
*/
