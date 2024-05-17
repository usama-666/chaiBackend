import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js"

dotenv.config({
  path: "./.env",
})

const app = express()

connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Applciation Running on Port :: ${process.env.PORT}`)
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
